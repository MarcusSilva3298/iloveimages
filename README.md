# ILoveImages - NestJS Project

![NestJS](https://img.shields.io/badge/NestJS-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-%23DC382D.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Description

This **NestJS** project is responsible for fetching, listing, and processing images stored in AWS buckets, utilizing a CDN to optimize distribution. It also uses **Redis** as a cache to enhance performance in repetitive image fetching and processing operations. The project is dockerized and uses a `docker-compose.yaml` file to simplify configuration and execution.

## Features

- Fetch images from AWS S3 buckets.
- List available images via API.
- Process images (formatting, quality adjustment, grayscale conversion).
- Use Redis for caching to improve performance.
- Distribute images via a CDN optimized for different regions.

## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [AWS S3](https://aws.amazon.com/s3/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## How to Run the Project

### Prerequisites

- [Docker](https://www.docker.com/) installed.
- [Docker Compose](https://docs.docker.com/compose/) installed.
- AWS credentials configured to access S3 (can be done with [AWS CLI](https://aws.amazon.com/cli/)).

### Steps to run the project

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```
2. Run the project with Docker Compose:
   ```bash
   docker-compose up --build
   ```
3. The application will be available at `http://localhost:3000`.

### API Endpoints

- **GET** `/pictures`: List available images.
- **GET** `/pictures/{filename.format}`: Fetch a specific image with optional query parameters to process the image:
  - `q`: Image quality (number from 1 to 100)
  - `fm`: Image format (string: `png`, `jpg`, or `webp`)
  - `w`: Image width (number)
  - `h`: Image height (number)
  - `gray`: Apply grayscale (1 or 0)


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
