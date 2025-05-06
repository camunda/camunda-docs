import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default function PageDescription() {
  const { metadata } = useDoc();
  return <p className="page-description">{metadata.description}</p>;
}