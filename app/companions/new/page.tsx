import CompanionForm from '@/components/CompanionForm'
import { newCompanionPermissions } from '@/lib/actions/companion.actions'
import { auth } from '@clerk/nextjs/server'
// import { Link } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const NewCompanions = async () => {

  const { userId } = await auth()
  if (!userId) redirect('/sign-in');

  const canCreateCompanion = await newCompanionPermissions()

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {canCreateCompanion ? (<article className='w-full flex flex-col gap-4'>
        <h1>
          Companion Builder
        </h1>
        <CompanionForm />
      </article>) : (<article className='companion-limit'>

        <Image src='/images/limit.svg' alt='Companion limit reached' width={360} height={230} />

        <div className='cta-badge' > Upgrade Your Plan</div>
        <h1>You've reached your limit</h1>
        <p >You've reached your companion limit. Upgrade to create more companions and premium features.</p>

        <Link href="/subscription" className='btn-primary w-full justify-center' >My Plan</Link>
      </article>)}
    </main>
  )
}

export default NewCompanions