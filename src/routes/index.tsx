import { createFileRoute } from "@tanstack/react-router";
import { Tinderbox } from "@/components/guide/tinderbox";

export const Route = createFileRoute("/")({ component: Tinderbox });
