const PRESS_NUM = 'PRESS_NUM';
const ENTER = 'ENTER';
const OPERATION = 'OPERATION';
const CLEAR = 'CLEAR';
const SWAP = 'SWAP';
const TOGGLE_NEGATIVE = 'TOGGLE_NEGATIVE';

export const pressNum = (n) => ({
    type: PRESS_NUM,
    payload: n,
});

export const enter = () => ({
    type: ENTER,
});

export const clear = () => ({
    type: CLEAR,
});

export const swap = () => ({
    type: SWAP,
});

export const operation = (op) => ({
    type: OPERATION,
    payload: op
});

export const toggleNegative = (idx) => ({
    type: TOGGLE_NEGATIVE,
    payload: idx
});

const doOperation = (x, y, op) => {
    const a = parseFloat(x);
    const b = parseFloat(y);
    if (op === 'pow') {
        return b ** a;
    } else if (op === '+') {
        return b + a;
    } else if (op === '-') {
        return b - a;
    } else if (op === 'X') {
        return b * a;
    } else if (op === '/') {
        return b / a;
    }
    return 0;
};

const initialState = {stack: [], inputState: 'replace'};
const swithNegative = (x) => {
    if (x.startsWith('-')) {
        return x.slice(1);
    }
    return `-${x}`;
};

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case TOGGLE_NEGATIVE:
            return {
                stack: state.stack.map((x, i) => payload === i ? swithNegative(x) : x),
                inputState: state.inputState
            }
        case SWAP:
            return {
                stack: [state.stack[1], state.stack[0], ...state.stack.slice(2)],
                inputState: 'push'
            }
        case CLEAR:
            return initialState;
        case OPERATION:
            return {
                stack: [`${doOperation(state.stack[0], state.stack[1], payload)}`, ...state.stack.slice(2)],
                inputState: 'push'
            }
        case ENTER:
            return {
                stack: [state.stack[0] || '0', ...state.stack],
                inputState: 'replace'
            }
        case PRESS_NUM:
            if (state.inputState === 'append') {
                return {
                    stack: [(state.stack[0] || '0')  + payload, ...state.stack.slice(1)],
                    inputState: 'append'
                };
            } else if (state.inputState === 'replace') {
                return {
                    stack: [payload, ...state.stack.slice(1)],
                    inputState: 'append'
                };
            } else if (state.inputState === 'push') {
                return {
                    stack: [payload, ...state.stack],
                    inputState: 'append'
                };
            }
        default:
            return state;
    }
};