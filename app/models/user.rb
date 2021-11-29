class User < ApplicationRecord
  has_secure_password
  has_many :books

  validates :email, presence: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: 'O email não é válido.' }
end
