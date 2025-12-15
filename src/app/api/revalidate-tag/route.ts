import {
  NEXT_PUBLIC_BEARER as B3AR3R,
  SUCCESFUL_MESSAGE_REVALIDATETAG
} from '@/lib/config';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const CONFIG_STATUS = {
  status: 400
};

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  if (!tag)
    return NextResponse.json({ message: 'The tag is required' }, CONFIG_STATUS);
  const { Authorization } = (await request.json()) as {
    Authorization: string;
  };
  if (!Authorization) {
    return NextResponse.json(
      { message: 'Authorization is required' },
      CONFIG_STATUS
    );
  }
  console.log(Authorization);
  const [_, token] = Authorization.split(' ');
  if (!token) {
    return NextResponse.json(
      { message: 'Token in Authorization is required' },
      CONFIG_STATUS
    );
  }

  console.log({ token, B3AR3R });
  if (token !== B3AR3R) {
    return NextResponse.json({ message: 'Token is invalid' }, CONFIG_STATUS);
  }

  revalidateTag(tag, 'max');
  return NextResponse.json(
    { message: SUCCESFUL_MESSAGE_REVALIDATETAG },
    { status: 200 }
  );
}
