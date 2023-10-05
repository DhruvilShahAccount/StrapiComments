// Header.tsx
import SectionFile from './Section';
import React, { useEffect, useState } from 'react';

export async function generateStaticParams() {
  try {
    const response = await fetch('http://127.0.0.1:1338/api/blog-pages/1');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

function Header() {
  const [dataVal, setDataVal] = useState<{ data: { attributes: any } } | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await generateStaticParams();
      setDataVal(data);
    }

    fetchData();
  }, []);

  if (!dataVal) {
    return <p>Loading...</p>;
  }

  const attributes = dataVal.data.attributes;

  return (
    <div>
      <div>
        <span>
          <a href={attributes.homeUrl}> Home </a>
          <i className="icon-arrow-right"></i>
          <a href={attributes.wisdomUrl}> Wisdom </a>
          <i className="icon-arrow-right"></i>
          <a href={attributes.wisdomArticlesUrl}> Articles </a>
          <i className="icon-arrow-right"></i>
          <a href={attributes.pujyaGurudevshriUrl}> Pujya Gurudevshri </a>
          <i className="icon-arrow-right"></i>
          <a href={attributes.pujyaGurudevshriInsights}> Pujya Gurudevshri Insights </a>
          <i className="icon-arrow-right"></i>
          <span className="breadcrumb_last" aria-current="page"> {attributes.header} </span>
        </span>
      </div>
      <img
        loading="lazy"
        width="1200"
        height="600"
        src={attributes.url1}
        className="attachment-38835 size-38835 wp-post-image lazyloaded"
        alt=""
        decoding="async"
        sizes="(max-width: 1200px) 100vw, 1200px"
        data-ll-status="loaded"
      />
      <h1></h1>
      <p className="blog-quote">{attributes.h1desc}</p>
      <hr className="show-line" />
      <p>{attributes.p1}</p>
      <hr className="show-space" />
      <p>{attributes.p2}</p>
      <hr className="show-space" />
      <SectionFile title={attributes.h1} content={attributes.p3} />
      <p>{attributes.p4}</p>
      <hr className="show-space" />
      <p>{attributes.p5}</p>
      <hr className="show-space" />
      <SectionFile title={attributes.h2} content={attributes.p6} />
      <p>{attributes.p7}</p>
      <hr className="show-space" />
      <p>{attributes.p8}</p>
      <hr className="show-space" />
      <p>{attributes.p9}</p>
      <hr className="show-space" />
      <SectionFile title={attributes.h3} content={attributes.p10} />
      <p>{attributes.p11}</p>
      <hr className="show-space" />
      <p>{attributes.p12}</p>
      <hr className="show-space" />
      <SectionFile title={attributes.h4} content={attributes.p13} />
      <p>{attributes.p14}</p>
      <hr className="show-space" />
      <SectionFile title={attributes.h5} content={attributes.p15} />
      <p>{attributes.p16}</p>
    </div>
  );
}

export default Header;
