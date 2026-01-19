import { cn } from '@/lib/utils';

export default function StatusBadge({ status, variant = 'default' }) {
    const configs = {
        pending: { label: 'Pending', bg: 'bg-yellow-50', text: 'text-yellow-600' },
        received: { label: 'Received', bg: 'bg-emerald-50', text: 'text-emerald-600' },
        partially_received: { label: 'Partial', bg: 'bg-blue-50', text: 'text-blue-600' },
        incoming: { label: 'Incoming', bg: 'bg-blue-50', text: 'text-blue-600' },
        assigned: { label: 'Assigned', bg: 'bg-orange-50', text: 'text-orange-600' },
        completed: { label: 'Completed', bg: 'bg-emerald-50', text: 'text-emerald-600' },
        cancelled: { label: 'Cancelled', bg: 'bg-red-50', text: 'text-red-600' }
    };

    const normalizedStatus = (status || 'pending').toLowerCase();
    const config = configs[normalizedStatus] || configs.pending;

    return (
        <span className={cn(
            "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tight inline-flex items-center gap-1.5",
            config.bg,
            config.text
        )}>
            <div className={cn("w-1 h-1 rounded-full", config.text.replace('text', 'bg'))} />
            {config.label}
        </span>
    );
}
