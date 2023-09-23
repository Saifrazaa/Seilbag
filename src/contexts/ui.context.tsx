import React, {type FC, PropsWithChildren} from 'react';

export interface State {
  connected: boolean;
}

const initialState: State = {
  connected: false,
};

type Action = {
  type: 'TOGGLE_CONNECTED';
};

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'TOGGLE_CONNECTED':
      return {
        ...state,
        connected: !state.connected,
      };
    default:
      return {
        ...state,
      };
  }
}

export const UIProvider: FC<PropsWithChildren> = props => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const toggleConnected = () => {
    dispatch({
      type: 'TOGGLE_CONNECTED',
    });
  };

  const value = React.useMemo(
    () => ({
      ...state,
      toggleConnected,
    }),
    [state],
  );
  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within UIProvider');
  }
  return context;
};

export const ManagedUIContext: FC<PropsWithChildren> = ({children}) => {
  return <UIProvider>{children}</UIProvider>;
};
