import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { baselineComponent } from '../../testing/utils';
import { FocusTrap, FocusTrapProps } from './FocusTrap';
import AppRoot from '../AppRoot/AppRoot';
import AdaptivityProvider from '../AdaptivityProvider/AdaptivityProvider';
import { ActionSheet, ActionSheetProps } from '../ActionSheet/ActionSheet';
import ActionSheetItem from '../ActionSheetItem/ActionSheetItem';
import View from '../View/View';
import { Panel } from '../Panel/Panel';
import { SplitLayout } from '../SplitLayout/SplitLayout';
import { SplitCol } from '../SplitCol/SplitCol';
import { CellButton } from '../CellButton/CellButton';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

const _children = ['first', 'middle', 'last'].map(
  (item) => <ActionSheetItem key={item} autoclose data-testid={item}>{item} Item</ActionSheetItem>,
);

const ActionSheetTest: React.FC<Partial<ActionSheetProps> & Partial<FocusTrapProps>> = ({
  children = _children,
  onClose,
  ...props
}) => {
  const toggleRef = React.useRef(null);
  const [actionSheet, toggleActionSheet] = React.useState<any>(null);

  const _onClose = () => {
    toggleActionSheet(null);
    onClose && onClose();
  };

  const _actionSheet = (
    <ActionSheet
      data-testid="sheet"
      toggleRef={toggleRef}
      onClose={_onClose}
      {...props}
    >{children}</ActionSheet>
  );

  return (
    <AppRoot>
      <AdaptivityProvider hasMouse>
        <SplitLayout popout={actionSheet}>
          <SplitCol>
            <View activePanel="panel">
              <Panel id="panel">
                <CellButton
                  data-testid="toggle"
                  getRootRef={toggleRef}
                  onClick={() => toggleActionSheet(_actionSheet)}
                >Toggle ActionSheet</CellButton>
              </Panel>
            </View>
          </SplitCol>
        </SplitLayout>
      </AdaptivityProvider>
    </AppRoot>
  );
};

describe('FocusTrap', () => {
  baselineComponent(FocusTrap);

  const mountActionSheetViaClick = () => {
    userEvent.click(screen.getByTestId('toggle')); // mount ActionSheet
    act(() => jest.runAllTimers());
  };

  const mountAndUnmounntActionSheet = () => {
    mountActionSheetViaClick();

    userEvent.keyboard('{esc}');
    act(() => jest.runAllTimers());
  };

  it('renders with no focusable elements', () => {
    render(<ActionSheetTest><React.Fragment>NOPE</React.Fragment></ActionSheetTest>);
    mountActionSheetViaClick();

    expect(screen.getByTestId('sheet')).toBeInTheDocument();
  });

  it('does not focus first element by default', () => {
    render(<ActionSheetTest />);
    mountActionSheetViaClick();

    expect(screen.getByTestId('first')).not.toHaveFocus();
  });

  it('always calls passed onClose on ESCAPE press', () => {
    const onClose = jest.fn();
    render(<ActionSheetTest onClose={onClose} />);
    mountAndUnmounntActionSheet();

    expect(onClose).toBeCalledTimes(1);
  });

  describe('focus restoration', () => {
    it('restores focus by default', () => {
      render(<ActionSheetTest onClose={() => jest.fn()} />);
      mountAndUnmounntActionSheet();

      expect(screen.getByTestId('toggle')).toHaveFocus();
    });

    it('does not restore focus if restoreFocus={false}', () => {
      render(<ActionSheetTest restoreFocus={false} onClose={() => jest.fn()} />);
      mountAndUnmounntActionSheet();

      expect(screen.getByTestId('toggle')).not.toHaveFocus();
    });
  });

  describe('specific keyboard navigation', () => {
    const mountViaKeyboard = () => {
      userEvent.tab(); // focus toggle via keyboard
      userEvent.keyboard('{enter}'); // mount ActionSheet via keyboard
      act(() => jest.runAllTimers());
    };

    it('focuses first element on keyboard navigation', () => {
      render(<ActionSheetTest />);
      mountViaKeyboard();

      expect(screen.getByTestId('first')).toHaveFocus();
    });

    it('manages navigation inside trap on TAB', () => {
      render(<ActionSheetTest />);
      mountViaKeyboard();

      // backwards
      userEvent.tab({ shift: true });
      expect(screen.getByTestId('last')).toHaveFocus();

      // backwards
      userEvent.tab({ shift: true });
      expect(screen.getByTestId('middle')).toHaveFocus();

      // forward
      userEvent.tab();
      expect(screen.getByTestId('last')).toHaveFocus();

      // forward
      userEvent.tab();
      expect(screen.getByTestId('first')).toHaveFocus();
    });
  });
});
