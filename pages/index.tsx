import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
'password= 0kqhQVA77eLefXWl'

import { createClient } from '@supabase/supabase-js'
import { useState } from 'react';
import cn from 'classnames';

// console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);

const supabaseAdmin = createClient(
  process.env.URL as string,
  process.env.SERVICE_KEY as string
);

interface IDataBase {
  id?: number,
  table?: string,
  name: string,
  href: string,
  userName: string,
  imageSrc: string,
}

async function insertToDataBase({ table = "TestImages", name, href, userName, imageSrc }: IDataBase) {
  try {
    await supabaseAdmin.from(`${table}`).insert([{
      name: name,
      href: href,
      userName: userName,
      imageSrc: imageSrc,
    }]);
  } catch (error) {
    console.log("InsertDataBase", error);
  }
}

console.log("Sever Running");

// insertToDataBase({
//   table: "TestImages",
//   name: 'Pedro Duarte',
//   href: 'https://twitter.com/peduarte/status/1463897468383412231',
//   userName: '@peduarte',
//   imageSrc: 'https://pbs.twimg.com/media/FFDOtLkWYAsWjTM?format=jpg',
// });

function CardItem() {
  return (
    <a href="#" className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img alt="" src="https://bit.ly/placeholder-img" className="group-hover:opacity-75" />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">Lee Robinson</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">@leeerob</p>
    </a>
  );
}

export async function getStaticProps() {
  const DataBase = await supabaseAdmin.from('TestImages').select('*');
  return {
    props: {
      FetchedData: DataBase
    }
  }
}

const HomePage = ({ FetchedData }: { FetchedData: any }) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const images = FetchedData.data as IDataBase[]

  function BlurImage({ image }: { image: IDataBase }) {
    return (
      <a href={image.href} className="group">
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <Image
            alt=""
            src={image.imageSrc}
            layout="fill"
            objectFit="cover"
            className={cn(
              'group-hover:opacity-75 duration-700 ease-in-out',
              isLoading
                ? 'grayscale blur-2xl scale-110'
                : 'grayscale-0 blur-0 scale-100'
            )}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{image.userName}</p>
      </a>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map(item => (
          <BlurImage key={item.id} image={item} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
