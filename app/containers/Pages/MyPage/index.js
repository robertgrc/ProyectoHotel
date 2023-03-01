import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';

class SamplePage extends React.Component {
  render() {
    const title = 'Dandelion Pro. Blank Page';
    const description = 'Dandelion Pro';
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Nueva Pagina" desc="Some text description">
          Nuevo Contenido
        </PapperBlock>
      </div>
    );
  }
}
export default SamplePage;
