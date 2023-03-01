import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { SourceReader, PapperBlock } from 'dan-components';
import TarjetaRegistroForm from './TarjetaRegistroForm';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function TarjetaRegistroPage() {
  const [valueForm, setValueForm] = useState(null);
  const showResult = (values) => {
    setValueForm(values);
      console.log(`You submitted**:\n\n${valueForm}`); // eslint-disable-line
  };
  useEffect(() => {
    console.log('valueform:', valueForm);
  }, [valueForm]);

  const title = brand.name + ' - Tarjeta de Resistro';
  const description = brand.desc;
  // const docSrc = 'containers/Pages/Forms/';
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
      <PapperBlock
        title="Redux Form"
        icon="ion-ios-list-box-outline"
        desc="This is a simple demonstration of how to connect all the standard material-ui form elements to redux-form."
      >
        <div>
          <TarjetaRegistroForm onSubmit={(values) => showResult(values)} />
          <p>Submited Result: </p>
          <code>{valueForm && valueForm.toString()}</code>
          {/* <SourceReader componentName={docSrc + 'ReduxFormDemo.js'} /> */}
        </div>
      </PapperBlock>
    </div>
  );
}

export default withStyles(styles)(TarjetaRegistroPage);
