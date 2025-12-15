import { Card } from '@/components/card/card';
import { DynamicBackground } from './background/ui/background';
import { ButtonRevalidatePath } from '@/components/buttonRevalidatePath';
import { ButtonRevalidateTag } from '@/components/buttonRevalidateTag';

export default function Home() {
  return (
    <>
      <DynamicBackground />
      <section className='am-home'>
        <Card />
        <ButtonRevalidatePath />
        <ButtonRevalidateTag />
      </section>
    </>
  );
}
