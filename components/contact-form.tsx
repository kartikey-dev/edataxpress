'use client';

import type { FormEvent } from 'react';

export function ContactForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent(`eDataXpress enquiry — ${data.get('service') || 'Book project'}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nProject: ${data.get('service') || 'Not specified'}\n\n${data.get('message')}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    const note = document.querySelector('#form-note');
    if (note) note.textContent = 'Your email app is opening with the message details filled in.';
  }

  return <form onSubmit={submit}>
    <label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required placeholder="What should we call you?" />
    <label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
    <label htmlFor="service">What are you working on?</label><select id="service" name="service"><option value="">Choose a service</option><option>Publishing</option><option>Printing</option><option>Marketing</option><option>Something else</option></select>
    <label htmlFor="message">A little about your project</label><textarea id="message" name="message" rows={4} required placeholder="Tell us where the idea has taken you so far…" />
    <button className="button button-dark" type="submit">Prepare your message <span>↗</span></button>
    <p className="form-note" id="form-note" aria-live="polite">Your email app will open with your message ready to send.</p>
  </form>;
}
