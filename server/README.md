# Uptime Monitor - Server

A NestJS-based backend for monitoring website uptime and performance. Tracks HTTP responses, response times, and maintains historical logs of all checks.

## ✨ Features

- 🔄 **Continuous Monitoring** - Checks websites every minute via scheduled cron job
- 📊 **Performance Tracking** - Records response time for each check
- 📈 **Historical Logs** - Maintains complete history of all checks
- 🚀 **Scalable** - Built with NestJS for enterprise-grade applications
- 🗄️ **PostgreSQL** - Persistent data storage with TypeORM
- 📝 **Type-Safe** - Full TypeScript support
- 🐳 **Docker Ready** - Includes docker-compose for easy setup

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Scheduling**: NestJS Schedule (@nestjs/schedule)
- **HTTP Client**: Axios
- **Validation**: class-validator, class-transformer

## 📁 Project Structure

```
server/
├── src/
│   ├── app.controller.ts    # Root controller
│   ├── app.module.ts        # Root module
│   ├── app.service.ts       # Root service
│   ├── main.ts              # Application entry point
│   ├── monitor/             # Monitor module
│   │   ├── monitor.module.ts
│   │   ├── monitor.controller.ts
│   │   ├── monitor.service.ts
│   │   ├── monitor.service.spec.ts
│   │   ├── dto/
│   │   │   └── create-monitor.dto.ts
│   │   └── entities/
│   │       ├── monitor.entity.ts
│   │       └── uptime-log.entity.ts
│   └── database/
│       └── database configuration
├── test/
│   └── app.e2e-spec.ts      # End-to-end tests
├── docker-compose.yml       # Local development database
├── package.json
├── tsconfig.json
└── nest-cli.json
```

## 📋 Database Schema

### Monitor Entity

```typescript
{
  id: UUID (primary key)
  url: string (unique)
  status: 'up' | 'down' | 'unknown'
  responseTime: number | null (in milliseconds)
  isActive: boolean (default: true)
  lastCheckedAt: Date | null
  createdAt: Date
  updatedAt: Date
}
```

### UptimeLog Entity

```typescript
{
  id: UUID (primary key)
  status: 'up' | 'down' | 'unknown'
  responseTime: number | null (in milliseconds)
  statusCode: number | null (HTTP status code)
  checkedAt: Date
  monitorId: UUID (foreign key to Monitor)
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Docker & Docker Compose (for database)
- npm or yarn

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Start PostgreSQL database**

```bash
docker-compose up -d
```

3. **Setup environment**
   Create `.env` file (optional - has defaults):

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=uptime_monitor
NODE_ENV=development
```

4. **Start the server**

**Development (with hot reload):**

```bash
npm run start:dev
```

**Production:**

```bash
npm run build
npm run start:prod
```

Server runs on `http://localhost:3001`

## 📡 API Endpoints

### Get All Monitors

```
GET /monitors
```

Returns array of all monitors.

**Response:**

```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "url": "https://example.com",
    "status": "up",
    "responseTime": 245,
    "isActive": true,
    "lastCheckedAt": "2026-04-01T10:30:00Z",
    "createdAt": "2026-04-01T10:00:00Z",
    "updatedAt": "2026-04-01T10:30:00Z"
  }
]
```

### Create Monitor

```
POST /monitors
Content-Type: application/json

{
  "url": "https://example.com"
}
```

**Response:** Monitor object with initial check performed

**Validation:**

- URL must be valid format (https://example.com)
- URL must be unique

**Error Responses:**

- `400` - Validation error (invalid URL, duplicate, etc.)
- `500` - Server error

### Get Monitor Logs

```
GET /monitors/:id/logs
```

Returns array of up to 50 most recent logs for a monitor.

**Response:**

```json
[
  {
    "id": "log-id-123",
    "status": "up",
    "responseTime": 245,
    "statusCode": 200,
    "checkedAt": "2026-04-01T10:30:00Z",
    "monitorId": "123e4567-e89b-12d3-a456-426614174000"
  }
]
```

**Error Responses:**

- `404` - Monitor not found

### Stop Monitoring

```
PATCH /monitors/:id/stop
```

Pauses monitoring for a monitor.

**Response:** Updated monitor object with `isActive: false`

**Error Responses:**

- `404` - Monitor not found

### Resume Monitoring

```
PATCH /monitors/:id/resume
```

Resumes monitoring for a paused monitor.

**Response:** Updated monitor object with `isActive: true`

**Error Responses:**

- `404` - Monitor not found

### Delete Monitor

```
DELETE /monitors/:id
```

Deletes a monitor and all its logs.

**Response:**

```json
{
  "message": "Monitor deleted successfully"
}
```

**Error Responses:**

- `404` - Monitor not found

## 🔄 Monitoring Process

### Automatic Checks

- Runs every **1 minute** via cron job
- Checks only **active** monitors
- Records response time, status code, and status
- Updates monitor's `lastCheckedAt` and `responseTime`

### Manual Checks

- Triggered when monitor is created
- Called via `checkSingle()` method
- Results immediately returned to frontend

### Check Flow

```
1. HTTP GET request to URL (10 second timeout)
2. Record response time and status code
3. Determine status:
   - 2xx-3xx: "up"
   - 4xx+: "down"
   - No response: "down"
4. Update Monitor entity
5. Create UptimeLog entry
6. Store in database
```

## 👥 Error Handling

### API Error Responses

**Validation Error (400)**

```json
{
  "statusCode": 400,
  "message": ["url must be a valid URL"],
  "error": "Bad Request"
}
```

**Not Found (404)**

```json
{
  "statusCode": 404,
  "message": "Monitor not found",
  "error": "Not Found"
}
```

**Server Error (500)**

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

## 🧪 Testing

### Run Unit Tests

```bash
npm run test
```

### Run E2E Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:cov
```

## 📊 Service Methods

### MonitorService

#### `create(dto: CreateMonitorDto): Promise<Monitor>`

Creates monitor and performs initial check.

#### `findAll(): Promise<Monitor[]>`

Fetches all monitors ordered by creation date (newest first).

#### `getLogs(id: string): Promise<UptimeLog[]>`

Fetches up to 50 most recent logs for a monitor.

#### `checkSingle(monitor: Monitor): Promise<void>`

Performs single uptime check on a monitor.

- Updates `status`, `responseTime`, `lastCheckedAt`
- Creates `UptimeLog` entry

#### `checkAll(): Promise<void>`

Runs checks on all active monitors (called every minute).

#### `stopMonitoring(id: string): Promise<Monitor>`

Pauses monitoring for a monitor (`isActive = false`).

#### `resumeMonitoring(id: string): Promise<Monitor>`

Resumes monitoring for a monitor (`isActive = true`).

#### `remove(id: string): Promise<{ message: string }>`

Deletes monitor and all associated logs.

## 📦 Dependencies

| Package           | Version | Purpose            |
| ----------------- | ------- | ------------------ |
| @nestjs/common    | ^10     | Core framework     |
| @nestjs/core      | ^10     | Core runtime       |
| @nestjs/typeorm   | ^10     | Database ORM       |
| @nestjs/schedule  | ^4      | Cron scheduling    |
| typeorm           | ^0.3    | Database mapping   |
| postgres          | ^15     | Database driver    |
| axios             | ^1      | HTTP client        |
| class-validator   | ^0.14   | DTO validation     |
| class-transformer | ^0.5    | DTO transformation |
| typescript        | ^5      | Language           |

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=uptime_monitor

# App
NODE_ENV=development
PORT=3001
```

### Database Connection

Configured in `TypeOrmModule.forRoot()` in `app.module.ts`:

- Auto-synchronizes schema
- Uses PostgreSQL
- Enabled logging in development

## 🐳 Docker Setup

### Start Services

```bash
docker-compose up -d
```

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f postgres
```

### Access PostgreSQL

```bash
docker-compose exec postgres psql -U postgres -d uptime_monitor
```

## 📝 Code Examples

### Check a Single Monitor

```typescript
const monitor = await this.monitorRepo.findOne({ where: { id } });
await this.checkSingle(monitor);
const updated = await this.monitorRepo.findOne({ where: { id } });
```

### Get Monitor with Logs

```typescript
const monitor = await this.monitorRepo.findOne({ where: { id } });
const logs = await this.logRepo.find({
  where: { monitor: { id } },
  order: { checkedAt: 'DESC' },
  take: 50,
});
```

### Create and Immediately Check Monitor

```typescript
const monitor = this.monitorRepo.create(dto);
const saved = await this.monitorRepo.save(monitor);
await this.checkSingle(saved);
const updated = await this.monitorRepo.findOne({ where: { id: saved.id } });
return updated;
```

## 🚀 Performance Optimizations

- Database indexes on `monitor.id`, `monitorId` in logs
- Pagination-ready (up to 50 logs returned)
- Efficient cron job with parallel checks
- Connection pooling with TypeORM
- Response time tracking in milliseconds

## 🔒 Security Considerations

- URL validation to prevent SSRF attacks
- Timeout on HTTP requests (10 seconds)
- Input validation with class-validator
- Type-safe with TypeScript
- SQL injection prevention via TypeORM

## 📈 Future Enhancements

- [ ] Authentication & authorization
- [ ] Rate limiting
- [ ] Alert notifications
- [ ] Custom check intervals
- [ ] Response body validation
- [ ] SSL certificate checks
- [ ] DNS resolution monitoring
- [ ] Webhook notifications
- [ ] API rate limiting
- [ ] User management

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is MIT licensed.

## 💬 Support

For issues and questions, please create an issue in the repository.

## 👨‍💻 Author

Built as an internship assignment - Uptime Monitor Application

---

**Note:** This is the backend API for the Uptime Monitor application. The frontend is built with Next.js and can be found in the `client/` directory.
