import React from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Application {
  title: string;
  image: string;
  description: string;
}

export interface TechSpec {
  label: string;
  value: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}