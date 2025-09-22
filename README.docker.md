# Docker Setup for Template001

This document explains how to run the Template001 Next.js application using Docker and Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Create environment file**:
   ```bash
   cp .env.example .env.local
   ```

2. **Build and start all services**:
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   - Website: http://localhost:3000
   - pgAdmin (database management): http://localhost:5050

## Services

### Web Application
- **Port**: 3000
- **Container**: template001-web
- Built from the local Dockerfile
- Depends on PostgreSQL database

### PostgreSQL Database
- **Port**: 5432
- **Container**: template001-postgres
- **Database**: template001_db
- **User**: template001_user
- **Password**: template001_password

### pgAdmin (Optional)
- **Port**: 5050
- **Container**: template001-pgadmin
- **Email**: admin@template001.com
- **Password**: admin123

## Environment Variables

The application uses the following environment variables (configured in docker-compose.yml):

- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_TEMPLATE_ID`: Template identifier
- `NEXT_PUBLIC_ID`: Unique instance ID
- `NEXT_PUBLIC_API_URL`: API base URL

## Docker Commands

### Start services in background
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f web
docker-compose logs -f postgres
```

### Rebuild and restart
```bash
docker-compose up --build --force-recreate
```

### Clean up (remove containers, networks, and volumes)
```bash
docker-compose down -v --remove-orphans
```

## Database Management

### Using pgAdmin
1. Access pgAdmin at http://localhost:5050
2. Login with admin@template001.com / admin123
3. Add server connection:
   - Host: postgres
   - Port: 5432
   - Database: template001_db
   - Username: template001_user
   - Password: template001_password

### Direct PostgreSQL access
```bash
docker-compose exec postgres psql -U template001_user -d template001_db
```

## Troubleshooting

### Database connection issues
- Ensure PostgreSQL container is healthy: `docker-compose ps`
- Check database logs: `docker-compose logs postgres`

### Build issues
- Clear Docker cache: `docker system prune -a`
- Rebuild without cache: `docker-compose build --no-cache`

### Port conflicts
- Change ports in docker-compose.yml if 3000, 5432, or 5050 are already in use

## Production Considerations

For production deployment:

1. Use environment-specific docker-compose files
2. Set secure passwords for database
3. Configure proper SSL certificates
4. Use Docker secrets for sensitive data
5. Set up proper backup strategies for PostgreSQL data
