import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

import "../css/formViewer.css";

export default class FormViewer extends React.Component {
  formContainer;

  constructor(props) {
    super(props);
    this.state = {
      isFormRendered: false,
    };
  }

  async renderForm() {
    if (this.state.isFormRendered) return;

    const schema = this.props.schema || {};
    const data = this.props.data || {};

    try {
      const FormJS = await import("@bpmn-io/form-js-viewer");
      const form = new FormJS.Form({
        container: this.formContainer,
      });
      form.importSchema(schema, data);
    } catch (e) {
      console.error("Form-js viewer rendering failed");
    }

    this.setState({ isFormRendered: true });
  }

  render() {
    const customClass = this.props.customClass || "";

    return (
      <BrowserOnly async fallback={<div>Loading form...</div>}>
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
      </BrowserOnly>
    );
  }
}
