import React, { ErrorInfo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Button, Container, Divider } from 'semantic-ui-react';

export interface ErrorBoundaryProps extends RouteComponentProps {}

export interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container textAlign="center">
          <Divider hidden />
          <h1>Hovsa! Der er gået noget galt...</h1>
          <Button onClick={() => (window.location.href = '/')}>
            Vend tilbage til forsiden ved at trykke her
          </Button>
          <Divider hidden />
          <p>
            Hvis det ikke hjælper, så prøv at slette alle cookies og browserdata, og genindlæs siden
            derefter.
          </p>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
