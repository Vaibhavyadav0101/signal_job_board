'use client';
import * as React from 'react';
import { FilterState, JobType, WorkMode, ExperienceLevel } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { allSkills } from '@/lib/data/jobs';
import { X } from 'lucide-react';

const jobTypeOptions: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const workModeOptions: WorkMode[] = ['Remote', 'Hybrid', 'Onsite'];
const experienceOptions: ExperienceLevel[] = ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'];

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  activeCount,
}: {
  filters: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  onReset: () => void;
  activeCount: number;
}) {
  function toggle<K extends 'jobTypes' | 'workModes' | 'experienceLevels' | 'skills'>(key: K, value: string) {
    const current = filters[key] as string[];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    onChange({ [key]: next } as Partial<FilterState>);
  }

  return (
    <aside className="space-y-6" aria-label="Job filters">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base font-semibold">Filters</h2>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-auto p-0 text-xs text-signal">
            Clear all ({activeCount})
          </Button>
        )}
      </div>

      <div>
        <Label htmlFor="location-filter">Location</Label>
        <Input
          id="location-filter"
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="City or 'Remote'"
          className="mt-2"
        />
      </div>

      <Separator />

      <fieldset>
        <legend className="text-sm font-medium text-ink">Salary range</legend>
        <div className="mt-4 px-1">
          <Slider
            min={40000}
            max={300000}
            step={5000}
            value={filters.salaryRange}
            onValueChange={(v) => onChange({ salaryRange: v as [number, number] })}
            aria-label="Salary range"
          />
          <div className="mt-2 flex justify-between font-mono text-xs text-muted">
            <span>${(filters.salaryRange[0] / 1000).toFixed(0)}k</span>
            <span>${(filters.salaryRange[1] / 1000).toFixed(0)}k</span>
          </div>
        </div>
      </fieldset>

      <Separator />

      <fieldset>
        <legend className="text-sm font-medium text-ink">Work mode</legend>
        <div className="mt-3 space-y-2.5">
          {workModeOptions.map((mode) => (
            <div key={mode} className="flex items-center gap-2.5">
              <Checkbox
                id={`mode-${mode}`}
                checked={filters.workModes.includes(mode)}
                onCheckedChange={() => toggle('workModes', mode)}
              />
              <Label htmlFor={`mode-${mode}`} className="font-normal text-muted">
                {mode}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <Separator />

      <fieldset>
        <legend className="text-sm font-medium text-ink">Job type</legend>
        <div className="mt-3 space-y-2.5">
          {jobTypeOptions.map((type) => (
            <div key={type} className="flex items-center gap-2.5">
              <Checkbox
                id={`type-${type}`}
                checked={filters.jobTypes.includes(type)}
                onCheckedChange={() => toggle('jobTypes', type)}
              />
              <Label htmlFor={`type-${type}`} className="font-normal text-muted">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <Separator />

      <fieldset>
        <legend className="text-sm font-medium text-ink">Experience level</legend>
        <div className="mt-3 space-y-2.5">
          {experienceOptions.map((level) => (
            <div key={level} className="flex items-center gap-2.5">
              <Checkbox
                id={`level-${level}`}
                checked={filters.experienceLevels.includes(level)}
                onCheckedChange={() => toggle('experienceLevels', level)}
              />
              <Label htmlFor={`level-${level}`} className="font-normal text-muted">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>

      <Separator />

      <fieldset>
        <legend className="text-sm font-medium text-ink">Skills</legend>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {allSkills.slice(0, 14).map((skill) => {
            const active = filters.skills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggle('skills', skill)}
                aria-pressed={active}
                className="focus-visible:outline-none"
              >
                <Badge variant={active ? 'signal' : 'outline'} className="cursor-pointer">
                  {skill}
                  {active && <X className="ml-1 h-3 w-3" />}
                </Badge>
              </button>
            );
          })}
        </div>
      </fieldset>
    </aside>
  );
}
