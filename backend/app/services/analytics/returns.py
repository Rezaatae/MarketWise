import math
from typing import List, Optional

def simple_returns(prices: List[float]) -> List[Optional[float]]:
    returns = []

    for i in range(len(prices)):
        if i == 0:
            returns.append(None)
        else:
            prev = prices[i-1]
            curr = prices[i]

            if prev == 0 or prev is None or curr is None:
                returns.append(None)
            else:
                returns.append((curr / prev) - 1)
    return returns


def log_returns(prices: List[float]) -> List[Optional[float]]:
    returns = []

    for i in range(len(prices)):
        if i == 0:
            returns.append(None)
        else:
            prev = prices[i - 1]
            curr = prices[i]

            if prev in (0, None) or curr in (0, None):
                returns.append(None)
            else:
                returns.append(math.log(curr / prev))

    return returns