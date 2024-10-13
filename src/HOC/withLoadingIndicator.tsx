import React from "react";
import Loading from "../Component/loading";

interface WithLoadingProps {
  isLoading: boolean;
}

const withLoadingIndicator = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => {
  return ({ isLoading, ...props }: WithLoadingProps) => {
    if (isLoading) {
      return <Loading></Loading>;
    }
    return <WrappedComponent {...(props as P)} />;
  };
};

export default withLoadingIndicator;
