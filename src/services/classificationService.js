const financialCriticalKeywords = [
    "credibom",
    "cartão universo",
    "cartao universo",
    "universo",
    "nos",
    "prestação",
    "prestacao",
    "mensalidade",
    "crédito",
    "credito",
    "empréstimo",
    "emprestimo",
    "dívida",
    "divida",
    "pagamento em atraso",
    "pagamento pendente",
    "valor em dívida",
    "valor em divida",
    "montante em dívida",
    "montante em divida",
    "incumprimento",
    "vencimento",
    "data limite",
    "data de pagamento",
    "fatura vencida",
    "factura vencida",
    "débito direto",
    "debito direto",
    "prestação mensal",
    "prestacao mensal",
    "parcela",
    "quota",
];
const financialCriticalSenders = [
    "credibom",
    "universo",
    "nos.pt",
    "cliente.nos.pt",
];
const paymentKeywords = [
    "invoice",
    "fatura",
    "factura",
    "recibo",
    "cobrança",
    "cobranca",
    "pagamento",
    "payment",
];
const securityKeywords = [
    "security alert",
    "alerta de segurança",
    "alerta de seguridad",
    "suspicious activity",
    "atividade suspeita",
    "actividad sospechosa",
    "verification code",
    "código de verificação",
    "codigo de verificacao",
    "código de verificación",
    "codigo de verificacion",
    "password reset",
    "recuperação da senha",
    "recuperar senha",
    "reset password",
    "account scheduled for deletion",
    "scheduled for deletion",
    "delete your account",
    "keep your account",
    "login attempt",
    "new login",
    "início de sessão",
    "inicio de sesion",
];
const importantKeywords = [
    "aima",
    "finanças",
    "financas",
    "segurança social",
    "seguranca social",
    "sns",
    "banco",
    "bank",
    "hospital",
    "clínica",
    "clinica",
    "creche",
    "escola",
    "contrato",
    "contract",
    "invoice",
    "fatura",
    "factura",
    "pagamento",
    "payment",
    "tax",
    "imposto",
];
const jobKeywords = [
    "job",
    "jobs",
    "empleo",
    "trabalho",
    "vaga",
    "vacancy",
    "recruiter",
    "recrutador",
    "application",
    "candidatura",
    "interview",
    "entrevista",
    "developer",
    "front-end",
    "frontend",
    "back-end",
    "backend",
    "data analyst",
    "javascript",
    "randstad",
    "indeed",
    "tecnoempleo",
    "trabajos.com",
    "jobalerts",
    "jobs-listings",
    "alertas de empleo",
    "alerta de empleo",
    "ofertas de empleo",
    "nuevas ofertas",
    "puesto de",
    "hiring",
];
const promotionKeywords = [
    "oferta",
    "promo",
    "promotion",
    "descuento",
    "descontos",
    "desconto",
    "discount",
    "sale",
    "flash sale",
    "hot deals",
    "deal",
    "deals",
    "black friday",
    "cyber monday",
    "cupón",
    "coupon",
    "limited time",
    "por tiempo limitado",
    "por tempo limitado",
    "día de las madres",
    "mothers day",
    "recarga",
    "x10",
    "internet nocturno",
    "cashback",
];
const newsletterKeywords = [
    "newsletter",
    "challenge",
    "daily",
    "weekly",
    "update",
    "digest",
    "boletim",
    "boletín",
];
const notificationKeywords = [
    "notification",
    "notificación",
    "notificacao",
    "notificação",
    "reminder",
    "recordatorio",
    "lembrete",
    "visited your profile",
    "han visitado tu perfil",
    "visitou o teu perfil",
    "profile views",
    "acercándose al final",
    "período autorizado",
    "periodo autorizado",
    "estacionamiento",
    "parking",
    "park",
    "iParque",
    "iparque",
];
function normalizeText(value) {
    return (value || "").toLowerCase();
}
function includesAny(text, keywords) {
    return keywords.some((keyword) => text.includes(keyword));
}
function hasLabel(message, label) {
    return message.labelIds?.includes(label) ?? false;
}
export function classifyEmail(message) {
    const senderText = (message.from ?? "").toLowerCase();
    const from = normalizeText(message.from);
    const subject = normalizeText(message.subject);
    const snippet = normalizeText(message.snippet);
    const combinedText = `${from} ${subject} ${snippet}`.toLowerCase();
    const isGmailPromotion = hasLabel(message, "CATEGORY_PROMOTIONS");
    const isGmailSocial = hasLabel(message, "CATEGORY_SOCIAL");
    const isGmailUpdates = hasLabel(message, "CATEGORY_UPDATES");
    const isFinancialCritical = includesAny(combinedText, financialCriticalKeywords) ||
        includesAny(senderText, financialCriticalSenders);
    if (includesAny(combinedText, securityKeywords)) {
        return {
            category: "security",
            importance: "high",
            recommendedAction: "review_manually",
            reason: "Looks related to account access, login, verification, password, deletion, or security alerts.",
        };
    }
    if (isFinancialCritical) {
        return {
            category: "financial_critical",
            importance: "high",
            recommendedAction: "keep_as_financial_critical",
            reason: "This email appears related to debt, credit, installments, mandatory bills, or financial obligations.",
        };
    }
    if (includesAny(combinedText, paymentKeywords)) {
        return {
            category: "payment",
            importance: "high",
            recommendedAction: "keep_in_inbox",
            reason: "Contains keywords related to invoices, receipts, payments, insurance, banking, or tax matters.",
        };
    }
    if (includesAny(combinedText, importantKeywords)) {
        return {
            category: "important",
            importance: "high",
            recommendedAction: "keep_in_inbox",
            reason: "Contains keywords related to official, financial, health, school, contract, payment, or legal matters.",
        };
    }
    if (includesAny(combinedText, jobKeywords)) {
        return {
            category: "job",
            importance: "medium",
            recommendedAction: "label_as_job",
            reason: "Contains keywords related to jobs, applications, recruiters, LinkedIn, or technology roles.",
        };
    }
    if (isGmailPromotion || includesAny(combinedText, promotionKeywords)) {
        return {
            category: "promotion",
            importance: "low",
            recommendedAction: "label_as_promotion",
            reason: "Looks like a commercial promotion, offer, discount, coupon, sale, or Gmail marked it as promotion.",
        };
    }
    if (includesAny(combinedText, newsletterKeywords)) {
        return {
            category: "newsletter",
            importance: "low",
            recommendedAction: "archive_later",
            reason: "Looks like a recurring newsletter, digest, update, or learning challenge.",
        };
    }
    if (includesAny(combinedText, notificationKeywords)) {
        return {
            category: "notification",
            importance: "low",
            recommendedAction: "label_as_notification",
            reason: "Looks like an automatic notification, reminder, profile update, parking notice, or app alert.",
        };
    }
    if (from.includes("noreply") || from.includes("no-reply")) {
        return {
            category: "review",
            importance: "low",
            recommendedAction: "review_manually",
            reason: "Automatic sender detected, but the content is not clearly safe to archive or delete yet.",
        };
    }
    if (isGmailSocial || isGmailUpdates) {
        return {
            category: "review",
            importance: "medium",
            recommendedAction: "review_manually",
            reason: "Gmail classified this as social or update, but no strong internal rule matched.",
        };
    }
    return {
        category: "review",
        importance: "medium",
        recommendedAction: "review_manually",
        reason: "No strong rule matched, so this email should be reviewed manually.",
    };
}
//# sourceMappingURL=classificationService.js.map