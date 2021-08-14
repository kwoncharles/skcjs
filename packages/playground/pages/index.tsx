import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>skcjs - playground</title>
      </Head>
      <ul>
        {[
          { text: 'useTimeout', href: '/examples/use-timeout' },
          { text: 'useUtilityState', href: '/examples/use-utility-state' },
        ].map(({ text, href }) => (
          <li key={href} className="list-disc underline hover:text-blue-500">
            <Link href={href}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
