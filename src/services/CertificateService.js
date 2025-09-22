import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { Platform } from 'react-native';

/**
 * CertificateService - Generates hardcoded PDF certificates using Expo
 * This service creates a PDF certificate with hardcoded demo data
 */

export const generateCertificate = async () => {
  try {
    console.log('📄 Generating certificate...');

    // Hardcoded certificate data
    const certificateData = {
      deviceSerial: '09A2312B',
      model: 'Google Pixel 9',
      status: 'SUCCESS',
      signature: 'SECURE_SIGN_ABC123XYZ',
      certificateId: `CERT-${Date.now()}`,
      generatedAt: new Date().toISOString(),
    };

    // Generate HTML content for PDF
    const htmlContent = generateHTMLContent(certificateData);
    
    // Generate PDF using expo-print
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    // Define final file path
    const fileName = `DataWipeCertificate_${certificateData.deviceSerial}_${Date.now()}.pdf`;
    const documentsPath = FileSystem.documentDirectory;
    const finalPath = `${documentsPath}${fileName}`;

    // Move the generated PDF to documents directory
    await FileSystem.moveAsync({
      from: uri,
      to: finalPath,
    });

    console.log('✅ Certificate generated successfully:', finalPath);

    return {
      success: true,
      filePath: finalPath,
      fileName: fileName,
      certificateData: certificateData,
      uri: finalPath,
    };
  } catch (error) {
    console.error('❌ Certificate generation failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

const generateHTMLContent = (data) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Data Wipe Certificate</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 40px;
                line-height: 1.6;
                color: #333;
            }
            .certificate {
                border: 4px solid #000;
                padding: 40px;
                max-width: 800px;
                margin: 0 auto;
                background: #fff;
            }
            .header {
                text-align: center;
                border-bottom: 3px solid #000;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .title {
                font-size: 32px;
                font-weight: bold;
                color: #ff595e;
                margin-bottom: 10px;
                letter-spacing: 2px;
            }
            .subtitle {
                font-size: 18px;
                color: #666;
            }
            .section {
                margin-bottom: 25px;
                padding: 15px;
                border: 2px solid #74b9ff;
                border-radius: 8px;
                background: #f8f9ff;
            }
            .section-title {
                font-size: 18px;
                font-weight: bold;
                color: #2d3436;
                margin-bottom: 15px;
                border-bottom: 2px solid #74b9ff;
                padding-bottom: 5px;
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
            }
            .info-label {
                font-weight: bold;
                color: #2d3436;
            }
            .info-value {
                color: #636e72;
            }
            .warning {
                background: #fdcb6e;
                border: 3px solid #000;
                padding: 20px;
                margin: 30px 0;
                text-align: center;
                border-radius: 8px;
            }
            .warning-title {
                font-size: 20px;
                font-weight: bold;
                color: #2d3436;
                margin-bottom: 10px;
            }
            .signature {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 2px solid #000;
            }
            .status-success {
                color: #00b894;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="certificate">
            <div class="header">
                <div class="title">DATA WIPE CERTIFICATE</div>
                <div class="subtitle">Device Security Verification</div>
            </div>

            <div class="section">
                <div class="section-title">CERTIFICATE INFORMATION</div>
                <div class="info-row">
                    <span class="info-label">Certificate ID:</span>
                    <span class="info-value">${data.certificateId}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Generated:</span>
                    <span class="info-value">${new Date(data.generatedAt).toLocaleString()}</span>
                </div>
            </div>

            <div class="section">
                <div class="section-title">DEVICE INFORMATION</div>
                <div class="info-row">
                    <span class="info-label">Device Serial Number:</span>
                    <span class="info-value">${data.deviceSerial}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Device Model:</span>
                    <span class="info-value">${data.model}</span>
                </div>
            </div>

            <div class="section">
                <div class="section-title">WIPE DETAILS</div>
                <div class="info-row">
                    <span class="info-label">Status:</span>
                    <span class="info-value status-success">${data.status}</span>
                </div>
            </div>

            <div class="signature">
                <p><strong>Digital Signature:</strong> ${data.signature}</p>
                <p><em>This certificate confirms that the above device has undergone
                a secure data wipe process as part of a demonstration.</em></p>
            </div>
        </div>
    </body>
    </html>
  `;

  return html;
};

export const shareCertificate = async (filePath) => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(filePath, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Certificate',
        UTI: 'com.adobe.pdf',
      });
      return { success: true };
    } else {
      return { success: false, error: 'Sharing not available' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCertificateStoragePath = () => {
  return FileSystem.documentDirectory;
};
