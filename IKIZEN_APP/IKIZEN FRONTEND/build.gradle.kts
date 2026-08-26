// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.android) apply false
}

// Relocate the build cache outside of the OneDrive folder permanently to stop Windows/OneDrive from file locking
allprojects {
    layout.buildDirectory.set(java.io.File("C:/IKIZEN_TEMP_BUILD_CACHE/${project.name}"))
}