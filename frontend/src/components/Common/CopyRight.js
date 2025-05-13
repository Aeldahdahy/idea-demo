import React, { useState } from 'react';
import { useFunctions } from '../../useFunctions';

function CopyRight() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signOutDistroySession } = useFunctions();

  return (
    <div className="CopyRight" onClick={() => signOutDistroySession(setLoading, setError)}>
      Copy Right © {new Date().getFullYear()} Designed by IDEA.
    </div>
  );
}

export default CopyRight;