import { Prisma } from "@prisma/client";

export type MessageType = {
  id: string | undefined;
  text: string;
  name: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
  type: string | null;
  date: number;
};

export type TicketType = {
  title: string,
  ticket: {
    user: string;
    name: string;
    avatar: string | undefined;
    images: string[];
    text: string;
    date: number;
  }[];
  opener: string;
  images?: string[];
  openerEmail: string;
  department: string;
  priority: string;
  tags: string[];
};

export type TicketTypeArray = {
  title: string;
  id: string;
  ticket: {
    user: string;
    name: string;
    avatar: string | undefined;
    images: string[];
    text: string;
    date: number;
  }[];
  opener?: string;
  images?: string[];
  openerEmail?: string;
  department: string;
  priority: string;
  tags?: string[];
}[];

export type TicketTypeFixed = {
  id: string;
  title: string;
  ticket: Prisma.JsonValue[];
  userMail: string;
  department: string;
  priority: string;
  tag: string[];
  userName: string | null;
  images: string[];
  responder: Prisma.JsonValue[];
  status: string | null;
  date: number;
  time: Date;
}[];
