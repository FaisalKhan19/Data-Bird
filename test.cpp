#include <Windows.h>
#include <UIAutomationClient.h>

int main()
{
    // Initialize the COM library
    HRESULT hr = CoInitializeEx(NULL, COINIT_MULTITHREADED); // Use COINIT_APARTMENTTHREADED for single-threaded environments
    if (FAILED(hr))
    {
        // Handle the error
        // ...

        return 1; // Return an error code to indicate failure
    }

    IUIAutomation* automation = nullptr; // Declare a pointer to the IUIAutomation interface.

    // Create the Automation object.
    hr = CoCreateInstance(
        CLSID_CUIAutomation,
        nullptr,
        CLSCTX_INPROC_SERVER,
        IID_IUIAutomation,
        (void**)&automation
    );

    // Check if the object was created successfully.
    if (SUCCEEDED(hr))
    {
        // You now have access to the UI Automation API through the 'automation' object.
        // You can use this object to perform actions like finding elements, retrieving properties, etc.

        // Remember to release the 'automation' object when you are done using it.
        automation->Release();
    }
    else
    {
        // Handle the error
        // ...
    }

    // Uninitialize the COM library
    CoUninitialize();

    return 0; // Return success code
}
