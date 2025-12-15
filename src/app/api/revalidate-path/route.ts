import {
  NEXT_PUBLIC_BEARER as B3AR3R,
  SUCCESFUL_MESSAGE_REVALIDATETAG,
  CONST_CACHE_PATH,
  SUCCESFUL_MESSAGE_REVALIDATEPATH
} from '@/lib/config';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const CONFIG_STATUS = {
  status: 400
};

export async function POST(request: NextRequest) {
  const { Authorization } = (await request.json()) as {
    Authorization: string;
  };
  if (!Authorization) {
    return NextResponse.json(
      { message: 'Authorization is required' },
      CONFIG_STATUS
    );
  }
  const [_, token] = Authorization.split(' ');
  if (!token) {
    return NextResponse.json(
      { message: 'Token in Authorization is required' },
      CONFIG_STATUS
    );
  }

  if (token !== B3AR3R) {
    return NextResponse.json({ message: 'Token is invalid' }, CONFIG_STATUS);
  }

  revalidatePath(CONST_CACHE_PATH);
  return NextResponse.json(
    { message: SUCCESFUL_MESSAGE_REVALIDATEPATH },
    { status: 200 }
  );
}
