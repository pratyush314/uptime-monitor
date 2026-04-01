# Uptime Monitor - Client

Modern, responsive Next.js frontend for monitoring website uptime and performance using TypeScript, Tailwind CSS, and Sonner for toast notifications.

## ✨ Features

- ✨ Modern and responsive UI with dark mode support
- 🎨 Beautiful animations and transitions
- 📊 Real-time uptime monitoring dashboard
- 🔔 Toast notifications for success/error messages
- 📱 Mobile-friendly design
- ⚡ Fast performance with Next.js 16
- 🎯 Type-safe with TypeScript
- 🏗️ Well-organized component structure

## 📁 Project Structure

```
client/
├── app/
│   ├── components/
│   │   ├── common/          # Reusable common components (ToastProvider, LoadingError)
│   │   ├── dashboard/       # Dashboard-specific components (Header, AddMonitorForm)
│   │   ├── layout/          # Layout components (Header, Footer, DashboardLayout)
│   │   └── monitors/        # Monitor-specific components (MonitorCard, MonitorsList)
│   ├── lib/
│   │   ├── api/             # API service layer and HTTP client
│   │   │   ├── client.ts    # API client with error handling
│   │   │   └── monitors.ts  # Monitor-specific API calls
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useMonitors.ts # Hook for managing monitors state
│   │   └── utils.ts         # Utility functions (formatters, validators)
│   ├── types/               # TypeScript type definitions
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main dashboard page
│   └── globals.css          # Global styles and animations
├── public/                  # Static assets
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
└── .env.example             # Environment variables example
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Setup

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment**

```bash
# Copy the example env file
cp .env.example .env.local

# Update .env.local with your API URL (default: http://localhost:3001)
```

3. **Start development server**

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📦 Available Scripts

### Development

```bash
npm run dev              # Start dev server with hot reload
npm run dev -- -p 3000  # Start on specific port
```

### Production

```bash
npm run build            # Build for production
npm start                # Start production server
```

### Quality

```bash
npm run lint             # Run ESLint
npm run lint -- --fix    # Fix linting issues
```

## 🧩 Component Architecture

### Layout Components

- **Header**: Sticky navigation header with branding
- **Footer**: Footer with links and social icons
- **DashboardLayout**: Main container for dashboard content

### Dashboard Components

- **DashboardHeader**: Title, description, and statistics widget
- **AddMonitorForm**: URL input form with validation and error handling

### Monitor Components

- **MonitorCard**: Individual monitor display with status, stats, and actions
- **MonitorsList**: Grid of monitor cards with empty state

### Common Components

- **ToastProvider**: Sonner toast notification provider
- **LoadingError**: Loading spinner and error message display

## 🪝 Custom Hooks

### useMonitors

Main hook managing all monitor operations:

```tsx
const {
  monitors, // Current monitors array
  isLoading, // Loading state
  error, // Error message
  addMonitor, // Create new monitor
  removeMonitor, // Delete monitor
  stopMonitorById, // Pause monitoring
  resumeMonitorById, // Resume monitoring
  refetch, // Manually refresh monitors
} = useMonitors();
```

Auto-refreshes monitors every 30 seconds.

## 🔗 API Service Layer

Centralized API calls with error handling:

```tsx
import { monitorsApi } from "@/app/lib/api";

// Get all monitors
const monitors = await monitorsApi.getAll();

// Create new monitor
const monitor = await monitorsApi.create({ url: "https://example.com" });

// Delete monitor
await monitorsApi.delete(monitorId);

// Stop monitoring
const updated = await monitorsApi.stop(monitorId);

// Resume monitoring
const updated = await monitorsApi.resume(monitorId);
```

## 🔔 Toast Notifications

Using Sonner for elegant notifications:

```tsx
import { toast } from "sonner";

// Success
toast.success("Added monitor", { description: "Now tracking..." });

// Error
toast.error("Failed to add", { description: errorMessage });

// Info
toast.info("Monitor paused");

// With action
toast.success("Done!", { action: { label: "Undo", onClick: () => {} } });
```

## 🎨 Styling & Animations

### Tailwind CSS

- Responsive design (mobile-first)
- Dark mode support
- Hover effects and transitions

### Custom Animations

- `animate-fade-in-up` - Fade with upward movement
- `animate-slide-in-down` - Slide down animation
- `animate-pulse-glow` - Pulsing glow effect
- `animate-shimmer` - Shimmer effect
- `animate-bounce-smooth` - Smooth bounce

### Dark Mode

- Auto-detects system preference
- All components responsive to dark mode
- Custom CSS variables for theming

## 📝 TypeScript Types

```tsx
interface Monitor {
  id: string;
  url: string;
  status: "up" | "down" | "unknown";
  responseTime: number | null;
  isActive: boolean;
  lastCheckedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CreateMonitorPayload {
  url: string;
}
```

## ⚙️ Environment Variables

Create `.env.local`:

```env
# API Base URL
NEXT_PUBLIC_API_URL=http://localhost:3001

# Environment
NODE_ENV=development
```

## 🎯 Best Practices

1. **Component Organization**
   - Group related components by feature
   - Use index files for cleaner exports
   - Keep components focused and reusable

2. **State Management**
   - Use custom hooks for complex logic
   - Keep state as local as possible
   - Use proper error handling

3. **API Integration**
   - Centralize API calls in service layer
   - Handle errors gracefully
   - Provide user feedback with toasts

4. **Styling**
   - Use Tailwind utilities first
   - Create custom utility classes for patterns
   - Maintain consistent color scheme

## 🚀 Performance

- Next.js code splitting and optimization
- Custom hooks prevent unnecessary re-renders
- Efficient API calls with cleanup
- CSS optimized with Tailwind purge

## 📚 Dependencies

| Package        | Purpose             |
| -------------- | ------------------- |
| `next`         | React framework     |
| `react`        | UI library          |
| `tailwindcss`  | CSS framework       |
| `sonner`       | Toast notifications |
| `lucide-react` | SVG icons           |
| `classnames`   | Conditional CSS     |
| `typescript`   | Type safety         |

## 🔮 Future Enhancements

- [ ] Dark/light mode toggle
- [ ] Monitor filtering and search
- [ ] Charts and statistics
- [ ] Data export functionality
- [ ] WebSocket real-time updates
- [ ] User authentication
- [ ] Custom alert thresholds
- [ ] Monitoring history

## 📄 License

MIT

## 💬 Support

For issues and questions, refer to the main project repository.
