import { Form } from "@bpmn-io/form-js";
//import '@bpmn-io/form-js-carbon-styles/src/carbon-styles.scss';
import React from "react";

import "../css/formViewer.css";

export default class FormViewer extends React.Component {
  formContainer;

  componentDidMount() {
    const schema = this.props.schema || {};
    const data = this.props.data || {};

    const form = new Form({
      container: this.formContainer,
    });

    form.importSchema(schema, data);
  }

  render() {
    const customClass = this.props.customClass || "";

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
  }
}
