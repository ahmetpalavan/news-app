import React from 'react'
import { category } from '../constants';

async function Homepage() {
  const news : NewsResponse = await fetchNews(category.join(','));
  return (
    <div>
      {/* newslist news */}
    </div>
  )
}

export default Homepage