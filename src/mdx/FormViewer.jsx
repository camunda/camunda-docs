import { Form } from "@bpmn-io/form-js";
//import '@bpmn-io/form-js-carbon-styles/src/carbon-styles.scss';
import React from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';

import "../css/formViewer.css";

export default class FormViewer extends React.Component {
  formContainer;

  constructor(props) {
    super(props);
    this.state = {
      isFormRendered: false
    };
  }

  renderForm() {
    if (this.state.isFormRendered) return;

    const schema = this.props.schema || {};
    const data = this.props.data || {};

    const form = new Form({
      container: this.formContainer,
    });

    form.importSchema(schema, data);

    this.setState({ isFormRendered: true });
  }

  render() {
    const customClass = this.props.customClass || "";

    return <BrowserOnly fallback={<div>Loading form...</div>}>
      {() => {
        // React lifecycle events do not work in BrowserOnly, 
        // so need to run an async timeout to render the form
        setTimeout(() => {
          this.renderForm();
        }, 0);

        return React.createElement("div", {
          className: customClass,
          style: {
            border: "1px solid #dadde1",
            padding: "8px",
            maxWidth: 600,
            marginBottom: "16px",
            background: "#fbfbfb",
          },
          ref: (e) => {
            this.formContainer = e;
          },
        });
      }}
    </BrowserOnly>;
  }
}
