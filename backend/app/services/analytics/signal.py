import pandas as pd

def compute_signal(close: pd.Series, ma: pd.Series) -> pd.Series:
    close, ma = close.align(ma)

    prev_close = close.shift(1)
    prev_ma = ma.shift(1)

    buy = (prev_close <= prev_ma) & (close > ma)
    sell = (prev_close >= prev_ma) & (close < ma)

    signal = []
    position = 0

    for b, s in zip(buy, sell):
        if b and position == 0:
            signal.append(1)
            position = 1
        elif s and position == 1:
            signal.append(-1)
            position = 0
        else:
            signal.append(0)

    signal = pd.Series(signal, index=close.index)
    valid = ma.notna() & ma.shift(1).notna()
    signal = signal.where(valid, 0)
    return signal