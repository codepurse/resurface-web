import React, { Component } from "react";
import Head from "next/head";

export class header extends Component {
  render() {
    return (
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Resurface</title>
        <link rel="stylesheet" href="Css/index.css"></link>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"
        ></link>
        <script
          src="https://code.jquery.com/jquery-3.5.1.js"
          integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
          integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
          integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
          crossorigin="anonymous"
        ></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://uicdn.toast.com/tui-calendar/latest/tui-calendar.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.css"
        />

        <link
          rel="stylesheet"
          type="text/css"
          href="https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.css"
        />
        <script src="https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js"></script>

        <script src="https://uicdn.toast.com/tui.time-picker/latest/tui-time-picker.min.js"></script>

        <script src="https://uicdn.toast.com/tui.date-picker/latest/tui-date-picker.min.js"></script>

        <script src="https://uicdn.toast.com/tui-calendar/latest/tui-calendar.js"></script>
      </Head>
    );
  }
}

export default header;
