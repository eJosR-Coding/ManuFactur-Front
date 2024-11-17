"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectDetails from "../../components/Profile/Projects/ProjectDetails";

export default function ProjectDetailsPage() {
    const params = useParams();
    const [projectId, setProjectId] = useState<string | null>(null);

    useEffect(() => {
        if (params?.id) {
            const id = Array.isArray(params.id) ? params.id[0] : params.id; // Asegúrate de que sea un string
            setProjectId(id);
        }
    }, [params]);

    if (!projectId) {
        return <div>Cargando...</div>;
    }

    return <ProjectDetails projectId={projectId} />;
}
