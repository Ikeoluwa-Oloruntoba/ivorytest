# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /app

# Install necessary tools including PostgreSQL client
RUN apk update && apk add --no-cache postgresql-client


COPY package*.json ./

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
# Install NestJS and other dependencies
RUN npm install -g @nestjs/cli
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate


# Copy the rest of the source files into the image.
COPY . .

RUN npm run build 

# Expose the port that the application listens on.
EXPOSE 3005

# Run the application.
CMD npm run start:dev
