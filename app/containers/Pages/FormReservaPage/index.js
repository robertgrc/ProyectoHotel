import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';

class FormReservaPage extends React.Component {
  render() {
    const title = 'Formulario de Reserva';
    const description = 'Formulario de Reserva';
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
        <PapperBlock title="Formulario de Reserva" desc="Some text description">
          Content
        </PapperBlock>
      </div>
    );
  }
}

export default FormReservaPage;
