'use client';
import { SUCCESFUL_MESSAGE_REVALIDATEPATH } from '@/lib/config';
import '@/styles/ButtonRevalidatePath.css';
import { useTransition } from 'react';
import { toast } from 'sonner';

export function ButtonRevalidatePath() {
  const [isPending, startTransition] = useTransition();
  function revalidePATH() {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/revalidate-path`, {
          method: 'POST',
          body: JSON.stringify({
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER}`
          }),
          headers: { 'Content-Type': 'application/json' }
        });

        const { message } = await res.json();
        if (!res.ok) {
          throw new Error(
            `Error ${res.status} - ${res?.statusText} - ${message}`
          );
        }

        if (message === SUCCESFUL_MESSAGE_REVALIDATEPATH) {
          toast.info(
            '"revalidate Path" succesful. To appreciate it please reload the page 1 or 2 times and after that see the card number change'
          );
        }
      } catch (err: any) {
        toast.error((err?.message as string) ?? 'Error revalidating path');
      }
    });
  }

  return (
    <button
      className='glowbutton'
      disabled={isPending}
      onClick={() => revalidePATH()}
    >
      {isPending ? 'Loading...' : 'revalidatePath'}
    </button>
  );
}
