import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';

type DateTime = {
  datetime: string,
};

export default async function Page() {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
  // else url: https://api.github.com/repos/vercel/next.js
  const fetchVercelData = await fetch('https://api.github.com/users/vercel');
  const vercelResData = await fetchVercelData.json();
  const fetchChicagoDatetimeData = await fetch('https://worldtimeapi.org/api/timezone/America/Chicago', { cache: 'no-store' });
  const chicagoResData: DateTime  = await fetchChicagoDatetimeData.json();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <h4 className={`text-lg font-bold`}>Data Fetch Demo:</h4>
      <ul className={`list-inside list-disc mb-5 leading-loose border pl-5`}>
        <li>Fake user repos url: {vercelResData.repos_url}</li>
        <li>Fake user email: {vercelResData.email}</li>
        <li>Fake user location: {vercelResData.location}</li>
      </ul>
      <p className={`mb-5`}>芝加哥現在時間: <time className={`text-sky-600`}>{chicagoResData.datetime}</time></p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
