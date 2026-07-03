'use client';
import * as React from 'react';
import { Upload, FileText, X, Plus, Mail, MapPin, GraduationCap, Briefcase, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useProfile, profileCompletion } from '@/hooks/useProfile';
import { useApplications } from '@/hooks/useApplications';
import { jobsWithCompanies } from '@/lib/data/jobs';
import { initials } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

export function ProfileView() {
  const [profile, setProfile, hydrated] = useProfile();
  const { applications } = useApplications();
  const [newSkill, setNewSkill] = React.useState('');
  const completion = profileCompletion(profile);

  function addSkill(e: React.FormEvent) {
    e.preventDefault();
    const skill = newSkill.trim();
    if (!skill || profile.skills.includes(skill)) return;
    setProfile((p) => ({ ...p, skills: [...p.skills, skill] }));
    setNewSkill('');
  }

  function removeSkill(skill: string) {
    setProfile((p) => ({ ...p, skills: p.skills.filter((s) => s !== skill) }));
  }

  function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfile((p) => ({ ...p, resumeFileName: file.name }));
    toast({ title: 'Resume uploaded', description: file.name, variant: 'success' });
  }

  if (!hydrated) {
    return <div className="container-px mx-auto max-w-5xl py-10 text-sm text-muted">Loading profile…</div>;
  }

  return (
    <div className="container-px mx-auto max-w-5xl py-10">
      <div className="mb-8 flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">{initials(profile.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-display text-2xl font-semibold">{profile.name}</h1>
            <p className="text-sm text-muted">{profile.title}</p>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {profile.email}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {profile.location}</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Profile strength</span>
            <span className="font-mono text-signal">{completion}%</span>
          </div>
          <Progress value={completion} className="mt-2" />
          <p className="mt-1.5 text-xs text-muted">
            {completion === 100 ? "You're fully set up." : 'Complete your profile to improve match accuracy.'}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>About</CardTitle></CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div>
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-border bg-surface p-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="pulse" className="gap-1">
                    {skill}
                    <button onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <form onSubmit={addSkill} className="flex gap-2">
                <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill" aria-label="Add a skill" />
                <Button type="submit" variant="outline" size="icon" aria-label="Add skill">
                  <Plus className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> Experience</CardTitle></CardHeader>
            <CardContent className="space-y-5 pt-0">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-signal/30 pl-4">
                  <p className="font-medium">{exp.role}</p>
                  <p className="text-sm text-muted">{exp.company} · {exp.start} – {exp.end ?? 'Present'}</p>
                  <p className="mt-1 text-sm text-muted">{exp.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Education</CardTitle></CardHeader>
            <CardContent className="space-y-4 pt-0">
              {profile.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-pulse/30 pl-4">
                  <p className="font-medium">{edu.school}</p>
                  <p className="text-sm text-muted">{edu.degree} · {edu.year}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Resume</CardTitle></CardHeader>
            <CardContent className="pt-0">
              {profile.resumeFileName ? (
                <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <FileText className="h-5 w-5 text-signal" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{profile.resumeFileName}</p>
                    <p className="text-xs text-muted">Uploaded</p>
                  </div>
                  <button onClick={() => setProfile((p) => ({ ...p, resumeFileName: null }))} aria-label="Remove resume">
                    <X className="h-4 w-4 text-muted hover:text-ink" />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border p-6 text-center transition-colors hover:border-signal">
                  <Upload className="h-5 w-5 text-muted" />
                  <span className="text-sm text-muted">Click to upload your resume</span>
                  <span className="text-xs text-muted">PDF, up to 10MB</span>
                  <input type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={handleResumeUpload} />
                </label>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Send className="h-4 w-4" /> Application history</CardTitle></CardHeader>
            <CardContent className="space-y-3 pt-0">
              {applications.length === 0 ? (
                <p className="text-sm text-muted">No applications yet.</p>
              ) : (
                applications.slice(0, 5).map((app) => {
                  const job = jobsWithCompanies.find((j) => j.id === app.jobId);
                  if (!job) return null;
                  return (
                    <div key={app.jobId} className="flex items-center justify-between text-sm">
                      <span className="truncate">{job.title}</span>
                      <Badge variant="outline">{app.status}</Badge>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
