"use client";

import React, { useEffect, useState } from "react";
import { RemoteConfigService } from "@/services/RemoteConfigService";

export const RemoteConfigProvider = ({ children }: { children: React.ReactNode }) => {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        RemoteConfigService.initialize().then(() => {
            setIsInitialized(true);
        });
    }, []);

    // We can just render children immediately, but now we know it initialized in background
    return <>{children}</>;
};
