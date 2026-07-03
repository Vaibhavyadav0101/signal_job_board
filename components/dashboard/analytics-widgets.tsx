'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, Send, Eye, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

const activity = [
  { day: 'Mon', views: 3 }, { day: 'Tue', views: 5 }, { day: 'Wed', views: 2 },
  { day: 'Thu', views: 8 }, { day: 'Fri', views: 6 }, { day: 'Sat', views: 1 }, { day: 'Sun', views: 4 },
];

export function AnalyticsWidgets({ saved, applied, viewed }: { saved: number; applied: number; viewed: number }) {
  const cards = [
    { icon: Bookmark, label: 'Saved jobs', value: saved, tone: 'text-signal' },
    { icon: Send, label: 'Applications', value: applied, tone: 'text-pulse' },
    { icon: Eye, label: 'Recently viewed', value: viewed, tone: 'text-amber' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <Card key={c.label}>
          <CardContent className="pt-6">
            <c.icon className={`h-5 w-5 ${c.tone}`} />
            <p className="mt-3 font-display text-2xl font-semibold">{c.value}</p>
            <p className="mt-1 text-sm text-muted">{c.label}</p>
          </CardContent>
        </Card>
      ))}

      <Card className="lg:col-span-1">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4 text-signal" /> Weekly activity
          </div>
          <div className="mt-2 h-16 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activity}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160 84% 45%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(160 84% 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" hide />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid hsl(var(--border))' }}
                  labelStyle={{ display: 'none' }}
                />
                <Area type="monotone" dataKey="views" stroke="hsl(160 84% 45%)" fill="url(#colorViews)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
