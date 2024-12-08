import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../CSS Files/SubjectPage.css";

const generateInviteCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length: 6 },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

const SubjectPage: React.FC = () => {
  const { subjectName } = useParams<{ subjectName: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [inviteCode, setInviteCode] = useState<string>("");
  const [memberDetails, setMemberDetails] = useState({
    fullName: "",
    email: "",
    inviteCode: "",
  });
  const [errors, setErrors] = useState({
    projectName: false,
    fullName: false,
    email: false,
    inviteCode: false,
  });
  const [copyButtonText, setCopyButtonText] = useState<string>("Copy Code");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRole(null);
    setIsNextClicked(false);
    setProjectName("");
    setProjectDescription("");
    setInviteCode("");
    setMemberDetails({ fullName: "", email: "", inviteCode: "" });
    setErrors({
      projectName: false,
      fullName: false,
      email: false,
      inviteCode: false,
    });
    setCopyButtonText("Copy Code");
  };

  const handleRoleSelect = (role: string) => setSelectedRole(role);
  const handleNextClickForRole = () => setIsNextClicked(true);
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
    if (errors.projectName)
      setErrors((prev) => ({ ...prev, projectName: false }));
  };
  const handleNextClickForProject = () => {
    if (!projectName.trim())
      return setErrors((prev) => ({ ...prev, projectName: true }));
    setInviteCode(generateInviteCode());
  };

  const handleMemberDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setMemberDetails((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors])
      setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleNextClickForInvite = () => {
    const newErrors = {
      fullName: !memberDetails.fullName.trim(),
      email: !memberDetails.email.trim(),
      inviteCode: !memberDetails.inviteCode.trim(),
    };

    if (newErrors.fullName || newErrors.email || newErrors.inviteCode)
      return setErrors((prev) => ({ ...prev, ...newErrors }));

    setIsModalOpen(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopyButtonText("Copied");
    setTimeout(() => setCopyButtonText("Copy Code"), 2000);
  };

  return (
    <div className="subject-page">
      <button className="top-left-button" onClick={openModal}>
        +
      </button>
      <h2>{subjectName}</h2>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="role-selection-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>
              {inviteCode
                ? "Invite Members"
                : isNextClicked
                ? selectedRole === "manager"
                  ? "Create Project"
                  : "Enter Member Details"
                : "Select User Role"}
            </h3>

            {!isNextClicked && !inviteCode && (
              <div className="role-options">
                <div
                  onClick={() => handleRoleSelect("manager")}
                  className={`role-option-container ${
                    selectedRole === "manager" ? "selected" : ""
                  }`}
                >
                  <div className="role-option"></div>
                  <div className="role-label">Manager</div>
                </div>
                <div
                  onClick={() => handleRoleSelect("member")}
                  className={`role-option-container ${
                    selectedRole === "member" ? "selected" : ""
                  }`}
                >
                  <div className="role-option"></div>
                  <div className="role-label">Member</div>
                </div>
              </div>
            )}

            {!isNextClicked && !inviteCode && (
              <button
                className="next-button"
                onClick={handleNextClickForRole}
                disabled={!selectedRole}
              >
                Next
              </button>
            )}

            {isNextClicked && selectedRole === "manager" && !inviteCode && (
              <div className="project-details">
                <div className="form-row">
                  <label htmlFor="project-name">Project Name *</label>
                  <input
                    type="text"
                    id="project-name"
                    value={projectName}
                    onChange={handleProjectNameChange}
                    className={errors.projectName ? "input-error" : ""}
                  />
                  {errors.projectName && (
                    <span className="error-message">
                      This field is required.
                    </span>
                  )}
                </div>
                <div className="form-row">
                  <label htmlFor="project-description">
                    Description (optional)
                  </label>
                  <textarea
                    id="project-description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
                <button
                  className="next-button"
                  onClick={handleNextClickForProject}
                >
                  Next
                </button>
              </div>
            )}

            {isNextClicked && selectedRole === "member" && !inviteCode && (
              <div className="member-details">
                <label htmlFor="full-name">Full Name *:</label>
                <input
                  type="text"
                  id="full-name"
                  name="fullName"
                  value={memberDetails.fullName}
                  onChange={handleMemberDetailsChange}
                  className={errors.fullName ? "input-error" : ""}
                />
                {errors.fullName && (
                  <span className="error-message">This field is required.</span>
                )}

                <label htmlFor="email">Email *:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={memberDetails.email}
                  onChange={handleMemberDetailsChange}
                  className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                  <span className="error-message">This field is required.</span>
                )}

                <label htmlFor="invite-code">Invite Code *:</label>
                <input
                  type="text"
                  id="invite-code"
                  name="inviteCode"
                  value={memberDetails.inviteCode}
                  onChange={handleMemberDetailsChange}
                  className={errors.inviteCode ? "input-error" : ""}
                />
                {errors.inviteCode && (
                  <span className="error-message">This field is required.</span>
                )}

                <button
                  className="next-button"
                  onClick={handleNextClickForInvite}
                >
                  Done
                </button>
              </div>
            )}

            {inviteCode && (
              <div className="invite-members">
                <p>Share this code with your teammates to invite them:</p>
                <div className="invite-code-container">
                  <input
                    type="text"
                    readOnly
                    value={inviteCode}
                    className="invite-code"
                  />
                  <button className="copy-code-button" onClick={handleCopyCode}>
                    {copyButtonText}
                  </button>
                </div>
                <button className="next-button" onClick={closeModal}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
