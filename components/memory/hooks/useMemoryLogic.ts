import { useEffect } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';

export function useMemoryLogic() {
  const { status, flippedIndices, endPreview, evaluateMatch } = useMemoryStore();

  // Handle PREVIEW phase
  useEffect(() => {
    let previewTimeout: NodeJS.Timeout;

    if (status === 'PREVIEW') {
      previewTimeout = setTimeout(() => {
        endPreview();
      }, 5000);
    }

    return () => {
      if (previewTimeout) clearTimeout(previewTimeout);
    };
  }, [status, endPreview]);

  // Handle card flipping evaluation
  useEffect(() => {
    let matchTimeout: NodeJS.Timeout;

    if (flippedIndices.length === 2) {
      matchTimeout = setTimeout(() => {
        evaluateMatch();
      }, 800);
    }

    return () => {
      if (matchTimeout) clearTimeout(matchTimeout);
    };
  }, [flippedIndices, evaluateMatch]);
}
