import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { generateStringHash } from "../../utils";
import { generateMeta } from "../../utils/seo";

export default class Html extends React.Component {

  static propTypes = {
    stylesheets: PropTypes.array,
    scripts: PropTypes.array,
    globals: PropTypes.shape({}),
    seo: PropTypes.shape({})
  };

  getMeta() {
    return generateMeta(this.props.seo);
  }
  getTitle() {
    const allMeta = this.getMeta();
    const metaForTitle = _.find(allMeta, {itemProp: "name"});
    if (metaForTitle) {
      return metaForTitle.content;
    }
    return "";
  }

  render() {
    "use strict";
    this.getMeta();
    const { stylesheets, scripts } = this.props;
    return (
      <html>
      <head>
        <title>{this.getTitle()}</title>
        {
          _.map(this.getMeta(), (meta, i) => {
            return <meta key={i} {...meta} />;
          })
        }
        {
          _.map(stylesheets, path => {
            const pathHash = generateStringHash(path, "CSS");
            return <link rel="stylesheet" key={pathHash} id={pathHash} href={path} />;
          })
        }
      </head>
      <body>
      <div id="app">{this.props.children}</div>
      {
        _.map(scripts, path => {
          const pathHash = generateStringHash(path, "JS");
          return <script type="text/javascript" key={pathHash} id={pathHash} src={path} />;
        })
      }
      </body>
      </html>
    );
  }
};