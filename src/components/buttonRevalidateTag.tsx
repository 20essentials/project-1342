'use client';
import { CONST_CACHE_TAG, SUCCESFUL_MESSAGE_REVALIDATETAG } from '@/lib/config';
import '@/styles/ButtonRevalidateTag.css';
import { useTransition } from 'react';
import { toast } from 'sonner';

export function ButtonRevalidateTag() {
  const [isPending, startTransition] = useTransition();
  function revalidateTAG() {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/revalidate-tag?tag=${CONST_CACHE_TAG}`, {
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

        if (message === SUCCESFUL_MESSAGE_REVALIDATETAG) {
          toast.success(
            '"revalidateTag" succesful. To appreciate it please reload the page 1 or 2 times and after that see the card number change'
          );
        }
      } catch (err: any) {
        toast.error((err?.message as string) ?? 'Error revalidating tag:');
      }
    });
  }

  return (
    <button
      className='button-revalidate'
      disabled={isPending}
      onClick={() => revalidateTAG()}
    >
      <span className='text'>{isPending ? 'Loading...' : 'revalidateTag'} </span>
      <span className='blob'></span>
      <span className='blob'></span>
      <span className='blob'></span>
      <span className='blob'></span>
    </button>
  );
}
