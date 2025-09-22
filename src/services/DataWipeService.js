/**
 * DataWipeService - Simulates device data wiping
 * This is a demo service that pretends to wipe data without actually deleting anything
 */

export const simulateDataWipe = async () => {
  return new Promise((resolve) => {
    // Simulate a delay for the wiping process
    setTimeout(() => {
      console.log('🔄 Starting data wipe simulation...');
      
      // Simulate various wipe steps
      const steps = [
        'Initializing secure wipe protocol...',
        'Scanning device storage...',
        'Identifying sensitive data locations...',
        'Beginning secure overwrite process...',
        'Overwriting user data (Pass 1/3)...',
        'Overwriting user data (Pass 2/3)...',
        'Overwriting user data (Pass 3/3)...',
        'Clearing system caches...',
        'Removing temporary files...',
        'Verifying data destruction...',
        'Finalizing secure wipe...',
        'Generating completion report...',
      ];

      steps.forEach((step, index) => {
        setTimeout(() => {
          console.log(`Step ${index + 1}: ${step}`);
        }, index * 800);
      });

      // Return success after simulation
      resolve({
        success: true,
        message: 'Data wipe simulation completed successfully',
        timestamp: new Date().toISOString(),
        steps: steps.length,
      });
    }, 8000); // 8 second delay to simulate processing
  });
};

export const getDeviceInfo = () => {
  return {
    serial: 'DEMO123456',
    model: 'DEMO-DEVICE',
    platform: 'Demo Platform',
    version: '1.0.0',
  };
};
