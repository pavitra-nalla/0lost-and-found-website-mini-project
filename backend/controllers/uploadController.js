import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import util from "util";

// Promisify fs.unlink to safely use async/await while deleting local files
const unlinkAsync = util.promisify(fs.unlink);

/**
 * Controller to upload a single image to Cloudinary using disk storage.
 * It first saves the file locally, uploads it to Cloudinary, and cleans it up.
 * Highly robust setup that guarantees a response instead of hanging.
 */
export const uploadImage = async (req, res) => {
    try {
        
        
        // 1. Edge Case: No file uploaded
        if (!req.file) {
            console.error("[Upload API] Error: No file found in request payload");
            return res.status(400).json({ message: "No image file provided. Please ensure the form field is named 'image'." });
        }

        

        // 2. Upload to Cloudinary using physical file path (await style)
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "lost-found",
            resource_type: "image",
        });

        

        // 3. Cleanup: Delete local file post-upload
        await unlinkAsync(req.file.path);

        // 4. Return success response ALWAYS
        return res.status(200).json({
            imageUrl: result.secure_url,
        });

    } catch (error) {
        console.error("\n[Upload API] Exception occurred during upload:", error);
        
        // 5. Intelligent Failure Cleanup: Delete local file on error if it persists
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            
            try {
                await unlinkAsync(req.file.path);
            } catch (cleanupError) {
                console.error("[Upload API] Failed to cleanup local file:", cleanupError);
            }
        }

        // Return error response ALWAYS
        return res.status(error.http_code || 500).json({ 
            message: "Internal Server Error. Upload failed.", 
            error: error.message || "Unknown error occurred" 
        });
    }
};
