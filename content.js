const COURSE_DATA = [
  {
    "numeral": "I",
    "title": "Access Control & Identity (Books 1, 4, 7, 13, 16, 17)",
    "books": [
      {
        "num": 1,
        "shortname": "The Access List",
        "subtitle": "SoD Conflict Testing",
        "intro": "Pull the current Segregation of Duties (SoD) conflict report for Accounts Payable and confirm whether vendor master maintenance and payment run execution sit on the same user ID.",
        "transactions": [
          {
            "tool": "GRC Access Control",
            "code": "Access Risk Analysis",
            "purpose": "Run a user-level or role-level risk analysis against the SoD rule set (Fiori app: \"Access Risk Analysis\", or NWBC path GRC \u2192 Access Management \u2192 Access Risk Analysis)"
          },
          {
            "tool": "SAP GUI",
            "code": "SUIM",
            "purpose": "User Information System \u2014 pull user/role assignment lists, authorization object values, and \"where-used\" for a given authorization object"
          },
          {
            "tool": "SAP GUI",
            "code": "PFCG",
            "purpose": "Role maintenance \u2014 display (do not edit) a role's authorization object values, including F110 (payment run) and FK02/XK02 (vendor master change) objects"
          },
          {
            "tool": "SAP GUI",
            "code": "SE16N",
            "purpose": "Display table USR02 / AGR_USERS to confirm actual role-to-user assignment as of a specific date"
          }
        ],
        "steps": [
          "In GRC Access Risk Analysis, select the risk ID for \"create/change vendor master + execute payment run\" (typically a P2P-ruleset risk) and run at the user level for the Accounts Payable organizational unit.",
          "Export the results list \u2014 this is your population of flagged users.",
          "For each flagged user, use PFCG in display mode to confirm which role(s) actually carry both authorization objects (F_LFA1_BUK combined with F110-related objects).",
          "Cross-check against SUIM \u2192 Users by Complex Selection Criteria to confirm the user's role assignment history, in case a role was recently changed.",
          "If a mitigating control is claimed, request the GRC Mitigation ID and pull its documentation from the GRC Rule Book / Mitigation Assignment screen."
        ],
        "evidence": "A dated export of the Access Risk Analysis report, the specific role names and authorization objects in conflict, and (if applicable) the mitigating control ID with its last review date.",
        "pitfall": "Running Access Risk Analysis at the role level instead of the user level can hide a real conflict if two separate, individually-clean roles combine to create a conflict only when assigned together to the same person. Always confirm at the user level."
      },
      {
        "num": 4,
        "shortname": "The Next Badge",
        "subtitle": "New-Hire & Turnover Access Testing",
        "intro": "Confirm a newly provisioned user was assigned the correct, current role \u2014 not a legacy or deactivated role template \u2014 following a personnel change.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "SU01",
            "purpose": "Display a single user's master record, assigned roles, and validity dates"
          },
          {
            "tool": "SAP GUI",
            "code": "SUIM",
            "purpose": "Report RSUSR200 \u2014 users by logon date/lock status; also \"users by role\" selection"
          },
          {
            "tool": "GRC Access Control",
            "code": "Access Request History",
            "purpose": "Review the original access request workflow (Fiori app: \"My Access Requests\" or \"Access Request History\") for the specific approval trail"
          },
          {
            "tool": "SAP GUI",
            "code": "PFCG",
            "purpose": "Display the role assigned; confirm it is not a deactivated/legacy role still visible in the request catalog"
          }
        ],
        "steps": [
          "Pull the HR termination/new-hire report for the test period from HR (outside SAP) and cross-reference names against SU01 active user records.",
          "For each new hire in the sample, open the GRC Access Request History and confirm the requested role matches the intended, current role design (not an old composite role).",
          "Use PFCG in display mode to confirm the assigned role's authorization objects match what the current process design calls for.",
          "Document any mismatch between what was requested, what was approved, and what was actually provisioned."
        ],
        "evidence": "The access request workflow printout/export showing requestor, approver, and role granted; a screenshot of SU01 showing the role assignment and validity date.",
        "pitfall": ""
      },
      {
        "num": 7,
        "shortname": "The Fourth Chair",
        "subtitle": "SoD Testing Outside Finance (Procurement)",
        "intro": "Run the same SoD methodology used for Accounts Payable against a different process area \u2014 Procurement \u2014 where the risk pairing is different (vendor master create + PO approval, rather than vendor master + payment run).",
        "transactions": [
          {
            "tool": "GRC Access Control",
            "code": "Access Risk Analysis",
            "purpose": "Run against the Procurement-specific ruleset; select risk IDs covering ME21N (create PO) combined with XK01/XK02 (vendor master maintenance)"
          },
          {
            "tool": "SAP GUI",
            "code": "SUIM",
            "purpose": "Confirm actual transaction usage history for the flagged user via \"Users by Transaction Executed\" (or ST03N for statistics)"
          },
          {
            "tool": "SAP GUI",
            "code": "SE16N",
            "purpose": "Display table EKKO/EKPO for the flagged user's actual PO activity, to confirm whether the access was ever exercised, not just granted"
          }
        ],
        "steps": [
          "Run Access Risk Analysis scoped specifically to the Procurement process area \u2014 do not assume the AP ruleset automatically covers Procurement; confirm the correct risk IDs are in scope.",
          "For any newly flagged conflict, check SUIM's transaction usage history to determine whether the access has actually been used, which affects severity but not the underlying finding.",
          "Interview the business process owner (BPO) using the same posture the story models \u2014 explain what the access allows, not what has happened.",
          "Document the population of similarly structured roles across other non-finance departments before closing the finding, since a gap found in one area often repeats in others."
        ],
        "evidence": "The Procurement-scoped risk analysis export, SUIM transaction usage history for the flagged user, and a summary memo documenting the BPO conversation.",
        "pitfall": ""
      },
      {
        "num": 13,
        "shortname": "The Tile",
        "subtitle": "Fiori Launchpad Security Testing",
        "intro": "Confirm that a Fiori launchpad tile's front-end catalog/group assignment does not grant visibility beyond what the user's backend role actually authorizes.",
        "transactions": [
          {
            "tool": "Fiori Admin",
            "code": "/UI2/FLPD_CUST",
            "purpose": "Fiori Launchpad Designer \u2014 review catalog and group assignments for a given business role"
          },
          {
            "tool": "Fiori Admin",
            "code": "Manage Launchpad Pages",
            "purpose": "Fiori app for reviewing/administering spaces, pages, and tile groups (S/4HANA Fiori 3.0+ launchpad model)"
          },
          {
            "tool": "SAP GUI",
            "code": "PFCG",
            "purpose": "Display the backend role's authorization objects tied to the same business function as the tile"
          },
          {
            "tool": "SAP GUI",
            "code": "SU24",
            "purpose": "Check the authorization object default values (check indicators) tied to the underlying OData service / transaction the tile calls"
          }
        ],
        "steps": [
          "In /UI2/FLPD_CUST or Manage Launchpad Pages, identify every tile visible to the test user's assigned business catalog(s).",
          "For each tile touching a sensitive function (payment, vendor master, journal posting), note the underlying OData service or target mapping (Fiori app \u2192 semantic object/action).",
          "Cross-reference that OData service in SU24 to identify which authorization objects the backend actually checks.",
          "Compare against PFCG for the user's assigned backend role \u2014 confirm every authorization object the tile could reach is genuinely restricted, not just assumed restricted because \"the tile isn't supposed to be there.\"",
          "Log into a test user session (or use \"Run As\" if your GRC configuration supports it) and attempt the transaction through the tile directly to confirm where, exactly, the block occurs."
        ],
        "evidence": "Screenshots of the visible tile, the SU24 check indicator table for the relevant service, and the PFCG authorization object values for the assigned role, with the specific screen where access was ultimately blocked (or not).",
        "pitfall": "A tile that is merely invisible to a role does not mean the underlying service is protected \u2014 test the actual OData call or transaction directly, not just what appears on the launchpad."
      },
      {
        "num": 16,
        "shortname": "The Firefighter Log",
        "subtitle": "Emergency Access Management (EAM) Testing",
        "intro": "Confirm every firefighter (emergency access) ID activation for the period has a completed, independent log review on file.",
        "transactions": [
          {
            "tool": "GRC Access Control",
            "code": "GRAC_SPM",
            "purpose": "Superuser Privilege Management \u2014 firefighter ID assignment, activation, and log review (also available as Fiori apps \"Firefighter Login\" / \"Firefighter Log Report\" / \"Firefighter Log Summary\")"
          },
          {
            "tool": "GRC Access Control",
            "code": "Firefighter Log Report",
            "purpose": "Fiori app pulling the full activation log with associated review status per activation"
          },
          {
            "tool": "SAP GUI",
            "code": "SM20",
            "purpose": "System Log \u2014 cross-check actual transactions executed under the firefighter ID during the activation window"
          }
        ],
        "steps": [
          "In the Firefighter Log Report app, pull all firefighter ID activations for the test period.",
          "For each activation, confirm a review status of \"Reviewed\" or \"Approved\" with a reviewer name and date populated \u2014 not blank or defaulted.",
          "For any activation without a completed review, pull the underlying transaction log via SM20 for that user ID and time window to reconstruct what was actually done.",
          "Compare the stated business justification on the activation request against the transactions actually executed in SM20 to confirm reasonableness."
        ],
        "evidence": "The full-period Firefighter Log Report export, with review status per line, plus SM20 transaction detail for any unreviewed activation.",
        "pitfall": "Firefighter activation and firefighter log review are two separate steps in GRC \u2014 confirm you are testing the review completion field specifically, not just that the ID was properly assigned and activated."
      },
      {
        "num": 17,
        "shortname": "The Leaver",
        "subtitle": "Joiner-Mover-Leaver (Termination Access) Testing",
        "intro": "Confirm that every terminated employee's SAP access was deactivated on or before their last working day, with no login activity afterward.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "SU01",
            "purpose": "Display user master record \u2014 confirm lock status (\"Locked\") and validity \"Valid To\" date"
          },
          {
            "tool": "SAP GUI",
            "code": "SUIM",
            "purpose": "Report RSUSR200 \u2014 list of users by last logon date, to identify any login activity after termination"
          },
          {
            "tool": "SAP GUI",
            "code": "SM20",
            "purpose": "System Log \u2014 confirm the specific transactions executed in any post-termination login session"
          },
          {
            "tool": "GRC Access Control",
            "code": "User Access Review",
            "purpose": "Fiori app for periodic access recertification; confirm the terminated user appears (or should have appeared) in the most recent cycle"
          }
        ],
        "steps": [
          "Obtain the HR termination list for the test period (outside SAP).",
          "For each terminated employee, run SU01 to confirm the account is locked and/or the validity end date is on or before the termination date.",
          "Run SUIM RSUSR200 for the full population, sorted by last logon date, to catch anyone with SAP activity after their stated termination date.",
          "For any post-termination login found, pull SM20 for that user ID and time window to document exactly what was accessed.",
          "Trace the deprovisioning request itself back to its source \u2014 was it submitted, and if so, was it submitted late? This tells you whether the gap is a process-timing issue or a process-existence issue."
        ],
        "evidence": "The HR termination list, the SU01 lock-status screenshot for each tested user, the RSUSR200 report, and SM20 detail for any exception.",
        "pitfall": ""
      }
    ]
  },
  {
    "numeral": "II",
    "title": "IT General Controls: Change & Operations (Books 2, 5, 8, 18, 19, 20)",
    "books": [
      {
        "num": 2,
        "shortname": "The Emergency Change",
        "subtitle": "Change Management Testing",
        "intro": "Confirm every production transport moved with a corresponding CAB approval (standard) or completed emergency justification form (emergency path) within the required window.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "STMS",
            "purpose": "Transport Management System \u2014 view the import queue and history for a given system/client"
          },
          {
            "tool": "SAP GUI",
            "code": "SE01 / SE09 / SE10",
            "purpose": "Transport Organizer \u2014 display a specific transport request's contents, release date, and importer"
          },
          {
            "tool": "SAP GUI",
            "code": "SE03",
            "purpose": "Transport Organizer Tools \u2014 search transports by date range, developer, or object type across the landscape"
          },
          {
            "tool": "External / ITSM",
            "code": "Change ticket system",
            "purpose": "Cross-reference each transport number against its CAB or emergency-change ticket (outside SAP, e.g. ServiceNow)"
          }
        ],
        "steps": [
          "In STMS, pull the import history for the production system for the test period \u2014 this is your population of all transports moved.",
          "For each transport number, use SE01 to confirm the transport's description, contents (programs, config tables touched), and release timestamp.",
          "Cross-reference each transport number against the change ticket system to confirm a matching, approved CAB ticket exists.",
          "For any transport without a matching standard ticket, check whether it was logged as an emergency change; confirm the emergency justification form was completed within the required window (e.g., 48 hours) of the transport's import timestamp.",
          "Flag and log, with exact transport numbers and timestamps, any transport with neither a standard ticket nor a completed emergency form."
        ],
        "evidence": "The STMS import history export (with timestamps), the SE01 transport detail for each sampled transport, and the matched (or unmatched) change ticket reference.",
        "pitfall": "STMS shows when a transport was imported, not when it was released from development \u2014 use SE01's release timestamp, not the import timestamp, when testing against an approval that should have preceded the transport's creation."
      },
      {
        "num": 5,
        "shortname": "The Cutover",
        "subtitle": "Change Management at Scale",
        "intro": "Apply the same transport-to-approval testing methodology as Book 2, but across a high-volume system upgrade/cutover event, confirming the process held under real volume.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "STMS",
            "purpose": "Pull the full cutover-weekend import queue across all affected systems"
          },
          {
            "tool": "SAP GUI",
            "code": "SPAM / SAINT",
            "purpose": "Support Package Manager / Add-On Installation Tool \u2014 confirm patch-level changes applied during the cutover"
          },
          {
            "tool": "SAP GUI",
            "code": "SCC3",
            "purpose": "Client Copy Log \u2014 if the cutover included a client refresh or copy, review the copy log for completeness"
          },
          {
            "tool": "SAP GUI",
            "code": "SE03",
            "purpose": "Cross-system transport search, scoped to the cutover weekend's date/time window"
          }
        ],
        "steps": [
          "Scope your population to the exact cutover window (e.g., a specific Friday 6 p.m. to Sunday midnight).",
          "Pull the complete transport list for that window via SE03, across every system in the landscape that was part of the cutover.",
          "Sample a statistically appropriate subset (not just a handful) given the elevated volume \u2014 this event is exactly the kind of high-risk window that warrants a larger sample than a routine month.",
          "For each sampled transport, confirm standard or emergency approval exactly as in Book 2's methodology, paying particular attention to timestamps near the edges of the emergency-approval window under real time pressure."
        ],
        "evidence": "The full cutover-window transport population, your sample selection methodology and rationale (documented, given the elevated volume), and approval evidence for each sampled item.",
        "pitfall": ""
      },
      {
        "num": 8,
        "shortname": "The Third Party",
        "subtitle": "Vendor-Executed Change Testing",
        "intro": "Confirm that changes executed by an outsourced/managed-services vendor carry the same evidentiary trail as internally executed changes, per the contractually required format.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "STMS / SE01",
            "purpose": "Confirm the vendor's transports in the standard SAP transport log, exactly as for internal changes"
          },
          {
            "tool": "External",
            "code": "Vendor ticketing export",
            "purpose": "The vendor's own change ticketing system export, mapped to Thornfield's CAB/emergency format per the contract's SLA clause"
          },
          {
            "tool": "SAP GUI",
            "code": "SU01 / SUIM",
            "purpose": "Confirm which user ID(s) the vendor's team actually used to execute changes, and that those IDs are properly restricted"
          }
        ],
        "steps": [
          "Pull the transport population for the period exactly as in Book 2, filtering to transports executed under the vendor's designated service account(s).",
          "Request the vendor's own change log export for the same period and period-match it against the SAP transport log.",
          "Confirm every vendor-executed emergency change has a completed justification form within the contractually required window, in the format your own reconciliation bridge requires.",
          "Independently sample-test a subset of the vendor's self-reported log against Thornfield's own SAP system logs (STMS/SM20) rather than accepting the vendor's report at face value."
        ],
        "evidence": "The vendor's change log export, the independent SAP-side transport log used to verify it, and documentation of any variance between the two.",
        "pitfall": "Never accept a vendor's self-reported completion log as sufficient evidence on its own \u2014 independently reconcile it against your own system's transport and system logs."
      },
      {
        "num": 18,
        "shortname": "The Untested Backup",
        "subtitle": "Computer Operations Testing",
        "intro": "Confirm that a sample backup can actually be restored, not merely that the nightly backup job reports \"Success.\"",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "DB13",
            "purpose": "DBA Planning Calendar \u2014 view scheduled and completed backup jobs and their completion status"
          },
          {
            "tool": "SAP GUI",
            "code": "DB12",
            "purpose": "Backup logs \u2014 detailed log output for a specific backup job"
          },
          {
            "tool": "OS/DB Tools",
            "code": "Database restore utility",
            "purpose": "The underlying database platform's restore tool (e.g., BR\\*Tools for Oracle/HANA) used to perform an actual test restore to an isolated environment"
          },
          {
            "tool": "SAP GUI",
            "code": "ST04",
            "purpose": "Database performance/administration overview, useful for confirming the restored instance is structurally sound"
          }
        ],
        "steps": [
          "Pull the full population of nightly backup completion reports for the test period via DB13/DB12 \u2014 confirm every night shows \"Success.\"",
          "Do not stop there: request that Basis perform a live restoration of a recent backup to an isolated, non-production environment.",
          "Observe (or request evidence of) the actual restore process, including elapsed time and any errors encountered.",
          "Once restored, confirm the recovered environment is usable \u2014 log in, run a basic report, and confirm data matches production as of the backup date.",
          "Document the full restoration procedure as evidence the control is real, not just scheduled."
        ],
        "evidence": "The DB13/DB12 completion log population, plus a documented, evidenced record of an actual test restoration \u2014 elapsed time, any errors found and corrected, and confirmation the restored data was usable.",
        "pitfall": "A green \"Success\" status in DB13 only confirms the backup job completed without an error code. It says nothing about whether the resulting file is actually restorable \u2014 that has to be tested directly, at least annually."
      },
      {
        "num": 19,
        "shortname": "The Interface Gap",
        "subtitle": "Interface Control Testing",
        "intro": "Confirm that records passing between SAP and a third-party or legacy system are not silently dropped by checking the interface's own error/failure log, not just its completion status.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "SM58",
            "purpose": "Transactional RFC (tRFC) monitor \u2014 view failed or pending RFC calls between systems"
          },
          {
            "tool": "SAP GUI",
            "code": "SXMB_MONI",
            "purpose": "SAP Process Integration/Orchestration monitor \u2014 review message-level success/failure detail for PI/PO-based interfaces"
          },
          {
            "tool": "SAP GUI",
            "code": "WE02 / WE05",
            "purpose": "IDoc monitoring \u2014 display individual IDocs and their processing status (including errors) for IDoc-based interfaces"
          },
          {
            "tool": "SAP GUI",
            "code": "BD87",
            "purpose": "Reprocess/status overview for IDocs stuck in error status"
          }
        ],
        "steps": [
          "Identify the interface's technology (IDoc, RFC, or PI/PO) and pull the corresponding monitor (WE02, SM58, or SXMB_MONI) for the test period.",
          "Reconcile total record volume sent by the source system against total records successfully posted in SAP for the same period \u2014 do not just confirm the batch job \"completed.\"",
          "For any variance, drill into the error/failure log specifically (not just the success count) to identify individual failed records and their error reason.",
          "Cross-reference a sample of failed records against the source system to confirm whether the underlying business transaction (e.g., a physical inventory receipt) still exists and was simply never reflected in SAP."
        ],
        "evidence": "The source-system record count, the SAP-side received/posted count, the interface error log detail for any variance, and the physical/source-system confirmation for a sample of dropped records.",
        "pitfall": "A batch job reporting \"complete\" only confirms the job ran end to end \u2014 it does not confirm every individual record inside the batch was successfully processed. Always check the record-level error log, not just the job-level status."
      },
      {
        "num": 20,
        "shortname": "The Back Door",
        "subtitle": "Custom Code / ABAP Security Testing",
        "intro": "Confirm that a custom (Z/Y-prefixed) transaction enforces the same authorization checks as the standard transaction it was built to shortcut.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "SE93",
            "purpose": "Transaction maintenance \u2014 display a custom transaction's definition and linked program"
          },
          {
            "tool": "SAP GUI",
            "code": "SE38 / SE80",
            "purpose": "ABAP Editor / Object Navigator \u2014 review the underlying program's AUTHORITY-CHECK statements (display/read-only)"
          },
          {
            "tool": "SAP GUI",
            "code": "SU24",
            "purpose": "Authorization object default values \u2014 compare what the standard transaction checks against what the custom transaction's program actually checks"
          },
          {
            "tool": "SAP GUI",
            "code": "SCI",
            "purpose": "Code Inspector \u2014 run a static analysis check for missing or weak authorization checks across a broader population of custom code"
          }
        ],
        "steps": [
          "Pull the full inventory of custom (Z/Y) transactions in the landscape via SE93 search by namespace.",
          "For each transaction touching a sensitive process (vendor master, payments, journal entries), open the linked program in SE38/SE80 (display mode) and review its AUTHORITY-CHECK statements.",
          "Compare the authorization objects and values actually checked in the custom program against SU24's standard default values for the equivalent standard transaction.",
          "Where the custom program's check is narrower, missing, or independently written rather than referencing the same objects, test directly with a restricted test user to confirm whether the restriction actually holds.",
          "Run SCI (Code Inspector) across the full custom code population to identify other transactions with the same pattern, rather than stopping at the one instance found."
        ],
        "evidence": "The SE93 transaction definition, the relevant AUTHORITY-CHECK code excerpt, the SU24 comparison, and a live test confirming whether a restricted user could or could not bypass the standard control through the custom transaction.",
        "pitfall": "Reading the code is necessary but not sufficient \u2014 always confirm the finding with an actual test using a real, restricted test user ID, since authorization logic can behave differently than the code appears to suggest."
      }
    ]
  },
  {
    "numeral": "III",
    "title": "Record to Report (Books 3, 6, 9)",
    "books": [
      {
        "num": 3,
        "shortname": "The Approval Limit",
        "subtitle": "Manual Journal Entry Review Testing",
        "intro": "Confirm every journal entry above the review threshold carries a documented, independent secondary approval, and identify whether the workflow's routing threshold is correctly configured.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "FB03",
            "purpose": "Display a posted financial document, including its approval/release workflow history"
          },
          {
            "tool": "SAP GUI",
            "code": "FBL3N",
            "purpose": "GL line item display \u2014 pull the full population of journal entries for the test period"
          },
          {
            "tool": "SAP GUI",
            "code": "SWI1 / SWIA",
            "purpose": "Work item / workflow analysis \u2014 confirm the entry was actually routed through the approval workflow and who acted on it"
          },
          {
            "tool": "SAP GUI",
            "code": "SPRO / OBWA (or client-specific config transaction)",
            "purpose": "Display (not change) the workflow's configured routing threshold value for confirmation against policy"
          }
        ],
        "steps": [
          "Pull the full population of journal entries above the stated review threshold for the test period via FBL3N, filtered by document type and amount.",
          "For each sampled entry, use FB03 to open the document and check the workflow/release strategy tab for a completed approval, or a null result.",
          "Where a workflow exists, use SWI1/SWIA to confirm the specific work item was completed by an approver independent of the preparer, with a timestamp.",
          "Separately, confirm the underlying workflow threshold configuration itself (via SPRO or the relevant config table, display mode only) matches the documented policy threshold \u2014 do not assume the two are the same without checking.",
          "For any entry above the threshold with no completed approval, escalate immediately rather than waiting to complete the full sample \u2014 this pattern (as in the story) often points to a configuration issue affecting many entries, not just one."
        ],
        "evidence": "The FBL3N population export, FB03 screenshots showing approval status per sampled entry, SWI1 workflow completion detail, and the confirmed configuration threshold value.",
        "pitfall": "Do not test only the entries the report shows as \"above threshold\" \u2014 independently recompute the population directly from FBL3N, since a misconfigured threshold (as in the story) will cause the workflow's own report to under-report exactly the entries you're looking for."
      },
      {
        "num": 6,
        "shortname": "The Other Ledger",
        "subtitle": "Acquired-Entity Controls Assessment",
        "intro": "Assess whether an acquired entity's manual journal entry review control is genuinely system-enforced or exists only as an unenforced policy, and confirm the interim compensating control's evidence trail.",
        "transactions": [
          {
            "tool": "SAP GUI or legacy system",
            "code": "FB03 / FBL3N equivalent",
            "purpose": "If the acquired entity has been migrated onto SAP, use standard R2R testing transactions; if not yet migrated, request the equivalent report from their legacy ERP"
          },
          {
            "tool": "Email / shared drive",
            "code": "Manual review evidence",
            "purpose": "For a manual (non-system) compensating control, the evidence is typically email approvals or a signed spreadsheet log \u2014 request the full population, not a sample the entity selects for you"
          },
          {
            "tool": "SAP GUI",
            "code": "SPRO",
            "purpose": "If integration work has begun, confirm what workflow configuration (if any) has been extended to the acquired entity's postings"
          }
        ],
        "steps": [
          "Confirm, in writing, whether the acquired entity's stated review control is enforced by any system mechanism at all, or is entirely dependent on an individual's manual review.",
          "If manual, request the full population of the compensating control's evidence (e.g., monthly reviewer sign-off emails) for the full period since acquisition \u2014 not a pre-selected sample.",
          "Test a sample of underlying entries against that evidence to confirm the review actually happened as documented, not just that a log exists.",
          "Document the root-cause gap (no system enforcement) as a distinct finding from any individual exceptions found in testing the entries themselves."
        ],
        "evidence": "The full population of manual review evidence, your sample testing results against that population, and a written root-cause description of the system-enforcement gap.",
        "pitfall": ""
      },
      {
        "num": 9,
        "shortname": "The Tip Line",
        "subtitle": "Investigating a Specific Journal Entry",
        "intro": "Reconstruct the full history and underlying support for a specific journal entry flagged by an anonymous tip, independent of the original tester's prior conclusion.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "FB03",
            "purpose": "Display the specific document in question, including all line items and document flow"
          },
          {
            "tool": "SAP GUI",
            "code": "FB03 \u2192 Environment \u2192 Document Changes",
            "purpose": "Change document history \u2014 confirm whether the entry was modified after initial posting, by whom, and when"
          },
          {
            "tool": "SAP GUI",
            "code": "SE16N",
            "purpose": "Direct table display on BKPF/BSEG (header/line item tables) for a broader, independent re-pull of the population, bypassing any report that may itself be in question"
          },
          {
            "tool": "SAP GUI",
            "code": "FBL3N",
            "purpose": "Re-pull the full population independently, without relying on the original tester's prior extract"
          }
        ],
        "steps": [
          "Do not start from the original workpaper's conclusion \u2014 reconstruct the population independently via FBL3N or SE16N directly against BKPF/BSEG.",
          "For the specific entry in question, use FB03's document change history to determine whether it was altered after initial posting.",
          "Independently obtain the underlying support (e.g., the actuarial claims data referenced in a reserve estimate) directly from its source system or owner, rather than accepting a prepared summary at face value.",
          "Recompute the estimate or calculation independently where possible, and compare your independent result against what was actually booked.",
          "Document every step of the reconstruction, since this file may ultimately be reviewed by Internal Audit, External Audit, or Legal."
        ],
        "evidence": "The independently re-pulled population, the FB03 change history, the source-system support obtained directly (not via a prepared summary), and your independent recomputation.",
        "pitfall": "When investigating a tip that touches a previously tested item, always rebuild the population and pull support independently rather than reusing the original workpaper's extract \u2014 the whole point of the investigation is to test whether the original evidence chain itself can be trusted."
      }
    ]
  },
  {
    "numeral": "IV",
    "title": "SAP GRC Platform Modules (Books 14, 15)",
    "books": [
      {
        "num": 14,
        "shortname": "The Rule That Never Fired",
        "subtitle": "GRC Process Control (CCM) Testing",
        "intro": "Confirm an automated business rule inside GRC Process Control is not merely scheduled and \"running,\" but is actually evaluating current data correctly.",
        "transactions": [
          {
            "tool": "GRC Process Control",
            "code": "Business Rules / Automated Monitoring",
            "purpose": "NWBC or Fiori app for reviewing configured automated control rules and their execution history"
          },
          {
            "tool": "GRC Process Control",
            "code": "Exception Report / Issue Management",
            "purpose": "Review the rule's historical output \u2014 exception counts by period"
          },
          {
            "tool": "SAP GUI",
            "code": "SM37",
            "purpose": "Background job monitor \u2014 confirm the underlying job is actually executing on schedule, without errors, distinct from whether its logic is correct"
          },
          {
            "tool": "SAP GUI",
            "code": "SE16N",
            "purpose": "Directly query the underlying source table(s) the rule is supposed to be evaluating, to independently confirm what the rule should have found"
          }
        ],
        "steps": [
          "Pull the automated rule's historical exception output for a meaningful trailing period (at least six to eight cycles), not just the most recent run.",
          "Look specifically for an exception rate that has dropped to zero, or is otherwise inconsistent with historical baseline, which is your indicator of a possible silent failure.",
          "Use SM37 to confirm the underlying background job is genuinely executing without technical errors \u2014 this rules out a simple scheduling failure and points you toward a logic/configuration issue instead.",
          "Independently query the source table(s) via SE16N to manually identify what the rule should have flagged, and compare that against what the rule actually reported.",
          "If a mismatch is found, trace the rule's configuration (reference tables, thresholds, field mappings) to identify the specific root cause."
        ],
        "evidence": "The rule's historical exception-count trend, the SM37 job execution log, your independent SE16N-based recomputation of what should have been flagged, and the root-cause configuration detail.",
        "pitfall": "A background job showing \"completed successfully\" in SM37 only confirms the job ran \u2014 it says nothing about whether the rule's underlying logic is still correctly evaluating current data. Always independently test the output against a manual recomputation."
      },
      {
        "num": 15,
        "shortname": "The Risk Register",
        "subtitle": "GRC Risk Management Testing",
        "intro": "Confirm every risk marked \"mitigated\" in the enterprise risk register actually references a real, currently active, tested control.",
        "transactions": [
          {
            "tool": "GRC Risk Management",
            "code": "Risk Register / Risk Workbench",
            "purpose": "NWBC or Fiori app for reviewing the risk catalog, including each risk's linked mitigating control reference"
          },
          {
            "tool": "Internal control inventory",
            "code": "Control library cross-reference",
            "purpose": "The team's own control documentation system (may be a GRC Process Control library or a separate tracker) \u2014 used to independently verify each control reference"
          },
          {
            "tool": "SAP GUI",
            "code": "SE16N",
            "purpose": "If the control reference points to a specific system control or report, confirm that control object still exists and is active"
          }
        ],
        "steps": [
          "Export the full risk register, including every risk's stated mitigation status and linked control reference ID.",
          "Independently cross-reference every control ID against the current, active control inventory \u2014 do not assume a listed reference is valid without checking.",
          "For any control reference that does not resolve to a real, current control, document it as a broken link and determine whether a real control exists under a different name/reference, or whether no control actually exists at all.",
          "For confirmed gaps, assess the underlying risk directly and determine whether new remediation work is required, distinct from simply correcting the register's documentation."
        ],
        "evidence": "The full risk register export, your control-reference cross-reference results, and documentation of any risk requiring new remediation as a result.",
        "pitfall": "The risk register is a claim about evidence, not evidence itself \u2014 never conclude a risk is mitigated because the register says so without independently confirming the referenced control actually exists and is current."
      }
    ]
  },
  {
    "numeral": "V",
    "title": "Governance, Disclosure & Executive Reporting (Books 10, 11, 12)",
    "books": [
      {
        "num": 10,
        "shortname": "The Signature Page",
        "subtitle": "Supporting Executive & Board Reporting",
        "intro": "As a junior consultant, your role is to ensure every deficiency in your own testing population is completely and accurately reflected in the underlying tracker your Senior Lead uses to brief the Compliance Director and, ultimately, the CFO.",
        "transactions": [
          {
            "tool": "GRC Process Control",
            "code": "Issue / Deficiency Tracker",
            "purpose": "The system of record for all findings \u2014 confirm your findings are logged with full, accurate detail, not a summarized version"
          },
          {
            "tool": "SAP GUI / Excel",
            "code": "Status reporting template",
            "purpose": "Whatever tracker or template your team uses to roll testing status up to your Senior Lead"
          }
        ],
        "steps": [
          "Before any status reporting deadline, confirm every finding you personally identified is logged in the tracker with the same specificity you would want if you were the one explaining it to the CFO.",
          "Never let a finding exist only in your own notes or a side conversation \u2014 the written tracker entry is what eventually becomes a sentence in a board deck.",
          "If asked to summarize your own testing status, report the honest state \u2014 including anything still open or uncertain \u2014 rather than rounding up to sound more complete than it is."
        ],
        "evidence": "A tracker entry, for every finding, dated the day it was identified, in your own words, before anyone has decided what to do about it.",
        "pitfall": ""
      },
      {
        "num": 11,
        "shortname": "The Comment Letter",
        "subtitle": "Supporting an SEC Response",
        "intro": "As a junior consultant, your role in an SEC comment letter response is to accurately assemble and organize the underlying evidence file \u2014 not to draft the legal response itself.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "FB03 / FBL3N / SE16N",
            "purpose": "Whatever transactions are relevant to the specific control being evidenced (e.g., re-pull the compensating control documentation referenced in the letter)"
          },
          {
            "tool": "Document management",
            "code": "Evidence file assembly",
            "purpose": "Organize source documents chronologically and by control period, exactly as they will need to be presented"
          }
        ],
        "steps": [
          "When asked to assemble evidence for a regulatory response, pull the complete, unedited population for the full period in question \u2014 never a curated subset.",
          "Organize your evidence file exactly the way it will be presented: by month, by control, with clear labeling, so your Senior Lead and Legal can move quickly under a hard deadline.",
          "Flag any gaps in the evidence honestly and immediately \u2014 a missing month of documentation found on day two of a ten-day response window is a manageable problem; found on day nine, it is not."
        ],
        "evidence": "The complete, organized evidence population for the period in question, with any gaps flagged in writing the moment they're found.",
        "pitfall": ""
      },
      {
        "num": 12,
        "shortname": "The Four-Day Clock",
        "subtitle": "Supporting a Disclosure Controls Review",
        "intro": "Recognize when a finding from your own routine testing might carry disclosure implications outside standard ICFR testing, and escalate immediately rather than treating it as a routine finding.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "SM21 / SM20",
            "purpose": "System log and security audit log \u2014 useful for reconstructing the technical timeline of a security-relevant event referenced in an incident report"
          },
          {
            "tool": "SAP GUI",
            "code": "STMS / SE01",
            "purpose": "If the finding involves an emergency system change tied to a security incident, cross-reference the transport log exactly as in Book 2's methodology"
          }
        ],
        "steps": [
          "If routine testing surfaces a reference to a security incident, system outage, or similar event with no clear record of legal/disclosure evaluation, do not simply note it and move on.",
          "Escalate to your Senior Lead the same day, with the specific reference (ticket number, transport number, date) that led you to notice it.",
          "Do not attempt to assess materiality or disclosure requirements yourself \u2014 that determination belongs to Legal and your Senior Lead; your job is accurate, fast escalation of what you found."
        ],
        "evidence": "The specific system reference (ticket, transport, or log entry) that surfaced the gap, and a dated record of when you escalated it.",
        "pitfall": ""
      }
    ]
  },
  {
    "numeral": "VI",
    "title": "Legal & Compliance Adjacent Scope (Books 21, 22)",
    "books": [
      {
        "num": 21,
        "shortname": "The Retention Policy",
        "subtitle": "Data Privacy / Retention Testing",
        "intro": "Confirm that personal data (former employee or vendor contact records) is not retained in the live system beyond its stated retention policy limit.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "SE16N",
            "purpose": "Direct table display on PA0002 (HR personal data) or vendor master tables (LFA1/LFBK) to identify records by age"
          },
          {
            "tool": "SAP GUI",
            "code": "SUIM / S_ALR\\_\\* reports",
            "purpose": "Standard reports for identifying inactive/terminated records by date"
          },
          {
            "tool": "ILM (if configured)",
            "code": "IRM_CUST / ILM_SIL",
            "purpose": "Information Lifecycle Management configuration and retention rule review, if the client uses SAP's native ILM functionality"
          }
        ],
        "steps": [
          "Confirm the written retention policy's specific time limit (e.g., three years post-termination) and the categories of data it covers.",
          "Use SE16N to pull the full population of relevant records (e.g., all terminated employees, or all inactive vendor contacts) with their relevant date fields.",
          "Filter for any record exceeding the policy's stated retention window that has not been anonymized, archived, or purged.",
          "Confirm whether any technical enforcement mechanism exists at all (ILM configuration, a scheduled job, or similar) versus the policy existing only as a document with no system-side enforcement."
        ],
        "evidence": "The full population export with age calculations, and documentation of whether a technical enforcement mechanism exists.",
        "pitfall": "A written retention policy is not evidence of a control \u2014 confirm there is an actual, scheduled, system-side mechanism enforcing it before concluding the control operates effectively."
      },
      {
        "num": 22,
        "shortname": "The Indirect Access",
        "subtitle": "SAP Licensing Exposure Testing",
        "intro": "Identify transaction volume flowing into SAP from third-party or self-service systems under a generic/service user ID, and confirm whether that access pattern has been evaluated for licensing implications.",
        "transactions": [
          {
            "tool": "SAP GUI",
            "code": "USMM",
            "purpose": "System Measurement \u2014 SAP's own license measurement tool; review user classification and engine-based metrics"
          },
          {
            "tool": "SAP GUI",
            "code": "SE16N",
            "purpose": "Query relevant transaction tables (e.g., VBAK for sales orders) filtered by the generic/service user ID to quantify volume"
          },
          {
            "tool": "SAP GUI",
            "code": "ST03N",
            "purpose": "Workload analysis \u2014 review activity volume and type attributable to a specific user ID or RFC connection over time"
          },
          {
            "tool": "SAP GUI",
            "code": "SM59",
            "purpose": "RFC destination maintenance (display mode) \u2014 confirm which external systems have an active, configured connection into SAP"
          }
        ],
        "steps": [
          "Use SM59 to inventory every active RFC connection between SAP and an external/third-party system.",
          "For each connection, use ST03N and SE16N to quantify the actual transaction volume and type flowing through that connection over a representative period.",
          "Run USMM to review how the system currently classifies this usage for licensing purposes, and compare that classification against the actual technical access pattern you've documented.",
          "Escalate any material, unquantified indirect access pattern to your Senior Lead for a formal licensing exposure assessment \u2014 this determination requires input from IT, Legal, and often outside licensing counsel, not a conclusion you would reach alone."
        ],
        "evidence": "The full RFC connection inventory, transaction volume analysis per connection, and the current USMM classification for comparison.",
        "pitfall": ""
      }
    ]
  }
];

